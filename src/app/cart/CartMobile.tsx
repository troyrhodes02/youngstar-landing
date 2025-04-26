"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Divider,
  Stack,
  Paper,
  FormControl,
  InputLabel,
  Container,
  Collapse,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaShoppingCart,
  FaLock,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import axios from "axios";

export const CartMobile = () => {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isReviewOpen, setIsReviewOpen] = useState(true);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const groupedCartItems = React.useMemo(() => {
    const groupedItems: Record<string, any> = {};
    
    cart.forEach(item => {
      const itemName = item.name;
      
      if (!groupedItems[itemName]) {
        groupedItems[itemName] = {
          name: itemName,
          image: item.image,
          basePrice: item.price,
          variants: [],
          totalQuantity: 0,
          totalPrice: 0
        };
      }
      
      groupedItems[itemName].variants.push({
        id: item.id,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      });
      
      groupedItems[itemName].totalQuantity += item.quantity;
      groupedItems[itemName].totalPrice += item.price * item.quantity;
    });
    
    return Object.values(groupedItems);
  }, [cart]);
  
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
  });
  
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleProceedToSquareCheckout = async () => {
    if (!shippingAddress.firstName || !shippingAddress.lastName || !shippingAddress.address || 
        !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode || !shippingAddress.country) {
      setApiError("Please fill in all required shipping address fields.");
      setIsShippingOpen(true);
      window.scrollTo(0, 0);
      return;
    }
    
    setApiLoading(true);
    setApiError(null);
    setCurrentStep(2);
    
    try {
      // Create line items from each variant
      const squareItems = [];
      for (const item of cart) {
        if (!item.variationId) {
          console.warn(`Item ${item.name} (${item.id}) has no variationId`);
          continue;
        }
        
        squareItems.push({
          catalogObjectId: item.variationId,
          quantity: item.quantity.toString()
        });
      }
      
      if (squareItems.length === 0) {
        throw new Error("No valid items to checkout");
      }

      // Map country codes to ISO format required by Square
      const mapCountryToISO = (country: string) => {
        const countryMap: Record<string, string> = {
          'USA': 'US',
          'CAN': 'CA',
          'GBR': 'GB', 
          'AUS': 'AU',
          'JPN': 'JP'
        };
        return countryMap[country] || country;
      };

      const customerDetails = {
        givenName: shippingAddress.firstName,
        familyName: shippingAddress.lastName,
        address: {
          addressLine1: shippingAddress.address,
          locality: shippingAddress.city,
          administrativeDistrictLevel1: shippingAddress.state,
          postalCode: shippingAddress.zipCode,
          country: mapCountryToISO(shippingAddress.country),
        },
      };

      console.log("Sending to /api/square-checkout:", { items: squareItems, customer: customerDetails });
      
      const { data } = await axios.post("/api/square-checkout", {
        items: squareItems,
        customer: customerDetails
      });

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setApiError(data.error || "Failed to create Square checkout link.");
      }
    } catch (error: any) {
      console.error("Error calling /api/square-checkout:", error);
      setApiError(error.response?.data?.error || error.message || "An error occurred while preparing checkout.");
    } finally {
      setApiLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Stack 
        minHeight="calc(100vh - 64px)" 
        alignItems="center" 
        justifyContent="center" 
        sx={{ bgcolor: 'black', color: 'white', pt: '64px', px: 2, textAlign: 'center' }}
      >
        <FaShoppingCart style={{ fontSize: 40, marginBottom: 16, color: 'red' }} />
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1.5 }}>
          Your Cart is Empty
        </Typography>
        <Typography variant="body1" color="grey.400" sx={{ mb: 3 }}>
          Add some items to get started
        </Typography>
        <Button
          component={Link}
          href="/"
          variant="contained"
          startIcon={<FaArrowLeft />}
          sx={{
            bgcolor: 'red',
            color: 'white',
            '&:hover': { bgcolor: '#c00' },
            px: 3,
            py: 1.5,
            fontSize: '0.9rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          Continue Shopping
        </Button>
      </Stack>
    );
  }

  const StepHeader = ({ title, step, onClick, currentStep }: {
    title: string;
    step: number;
    onClick?: () => void;
    currentStep: number;
  }) => (
    <Box 
      sx={{ p: 2, bgcolor: '#2a2a2a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Box sx={{ 
          width: 28, height: 28, borderRadius: '50%', 
          bgcolor: currentStep >= step ? 'red' : 'grey.700', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          fontSize: '0.9rem', fontWeight: 'bold'
        }}>
          {step}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, fontSize: '1.1rem', color: 'white' }}>
          {title}
        </Typography>
      </Stack>
      {step === 1 && (isReviewOpen ? <FaChevronUp color="white" /> : <FaChevronDown color="white" />)}
    </Box>
  );

  return (
    <Box sx={{ minHeight: 'calc(100vh - 88px)', bgcolor: 'black', color: 'white', pb: 5 }}>
      <Container maxWidth="md" sx={{ pt: 3 }}>
        <Typography variant="h5" component="h1" align="center" gutterBottom 
          sx={{ 
            fontWeight: 'bold', 
            textTransform: 'uppercase', 
            letterSpacing: 2, 
            borderBottom: '2px solid red', 
            display: 'inline-block', 
            pb: 1, 
            mb: 4,
            mx: 'auto'
          }}
        >
          Review Your Order
        </Typography>
        
        <Paper sx={{ bgcolor: '#1c1c1c', border: '1px solid #333', borderRadius: 2, overflow: 'hidden', mb: 3 }}>
          <Box sx={{ p: 2, bgcolor: 'red' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, fontSize: '1.1rem', color: 'white' }}>
              Order Summary
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
             <Stack spacing={1} sx={{ py: 1, borderBottom: '1px solid #333' }}>
               <Stack direction="row" justifyContent="space-between">
                 <Typography variant="body2" color="grey.300">Subtotal</Typography>
                 <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'white' }}>${(totalPrice / 100).toFixed(2)}</Typography>
               </Stack>
               <Stack direction="row" justifyContent="space-between">
                 <Typography variant="body2" color="grey.300">Shipping & Tax</Typography>
                 <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'white' }}>Calculated later</Typography>
               </Stack>
             </Stack>
             <Stack direction="row" justifyContent="space-between" sx={{ pt: 1.5, mt: 1.5 }}>
               <Typography variant="body1" sx={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'white' }}>Total</Typography>
               <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'red' }}>${(totalPrice / 100).toFixed(2)}</Typography>
             </Stack>
          </Box>
        </Paper>

        <Paper sx={{ bgcolor: '#1c1c1c', border: '1px solid #333', borderRadius: 2, overflow: 'hidden', mb: 3 }}>
          <StepHeader 
            title="Review Products" 
            step={1} 
            onClick={() => setIsReviewOpen(!isReviewOpen)} 
            currentStep={currentStep}
          />
          <Collapse in={isReviewOpen}>
            <Stack divider={<Divider sx={{ bgcolor: '#333' }} />}>
              {groupedCartItems.map((item) => (
                <Stack key={item.name} spacing={2} sx={{ p: 2, '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}>
                  <Stack direction="row" spacing={2}>
                    {item.image && (
                      <Box sx={{ width: 80, height: 80, flexShrink: 0, bgcolor: '#2a2a2a', borderRadius: 1, overflow: 'hidden' }}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Box>
                    )}
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>{item.name}</Typography>
                      <Typography variant="body2" sx={{ mt: 0.5, color: 'white' }}>${(item.basePrice / 100).toFixed(2)}</Typography>
                      
                      <Box sx={{ mt: 1.5 }}>
                        {item.variants.map((variant: any) => (
                          <Stack key={`${variant.id}-${variant.size}`} direction="row" alignItems="center" sx={{ mt: 1, flexWrap: 'wrap', gap: { xs: 0.5, sm: 1 } }}>
                            <Box sx={{ 
                              bgcolor: '#333', 
                              color: 'white', 
                              px: 1, 
                              py: 0.5, 
                              borderRadius: 1, 
                              fontSize: '0.75rem',
                              fontWeight: 'bold',
                              minWidth: 36,
                              textAlign: 'center'
                            }}>
                              {variant.size}
                            </Box>
                            <Stack direction="row" alignItems="center" sx={{ border: '1px solid #444', borderRadius: 1 }}>
                              <IconButton 
                                onClick={() => updateQuantity(variant.id, Math.max(1, variant.quantity - 1))} 
                                size="small" 
                                sx={{ color: 'white', '&:hover': { bgcolor: '#444' }, borderRadius: '4px 0 0 4px', p: 0.8 }}
                              >
                                <FaMinus size={8} />
                              </IconButton>
                              <Typography sx={{ width: 24, textAlign: 'center', fontSize: '0.75rem', color: 'white' }}>
                                {variant.quantity}
                              </Typography>
                              <IconButton 
                                onClick={() => updateQuantity(variant.id, variant.quantity + 1)} 
                                size="small" 
                                sx={{ color: 'white', '&:hover': { bgcolor: '#444' }, borderRadius: '0 4px 4px 0', p: 0.8 }}
                              >
                                <FaPlus size={8} />
                              </IconButton>
                            </Stack>
                            <Typography sx={{ color: 'white', fontSize: '0.8rem' }}>
                              ${(variant.price * variant.quantity / 100).toFixed(2)}
                            </Typography>
                            <IconButton 
                              onClick={() => removeFromCart(variant.id)} 
                              size="small" 
                              sx={{ color: 'red', p: 0.5 }}
                            >
                              <FaTrash size={12} />
                            </IconButton>
                          </Stack>
                        ))}
                      </Box>
                    </Box>
                  </Stack>
                  
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="grey.400">
                      Total Qty: {item.totalQuantity}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'white' }}>
                      ${(item.totalPrice / 100).toFixed(2)}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Collapse>
        </Paper>

        <Paper sx={{ bgcolor: '#1c1c1c', border: '1px solid #333', borderRadius: 2, overflow: 'hidden', mb: 3 }}>
          <StepHeader 
            title="Shipping Address" 
            step={2} 
            currentStep={currentStep}
          />
          <Box sx={{ p: 2 }}>
             {apiError && (
                 <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>
             )}
             <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.200' }}>First Name*</Typography>
                  <TextField name="firstName" value={shippingAddress.firstName} onChange={handleAddressChange} fullWidth variant="filled" size="small" InputLabelProps={{ shrink: true }} inputProps={{ sx: { color: 'white' } }} sx={{ bgcolor: '#2a2a2a', borderRadius: 1, '& .MuiFilledInput-root': { bgcolor: '#2a2a2a', '&:hover': { bgcolor: '#383838' }, '&.Mui-focused': { bgcolor: '#383838' } } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Last Name*" name="lastName" value={shippingAddress.lastName} onChange={handleAddressChange} fullWidth variant="filled" size="small" InputLabelProps={{ sx: { color: 'grey.200' } }} inputProps={{ sx: { color: 'white' } }} sx={{ bgcolor: '#2a2a2a', borderRadius: 1, '& .MuiFilledInput-root': { bgcolor: '#2a2a2a', '&:hover': { bgcolor: '#383838' }, '&.Mui-focused': { bgcolor: '#383838' } } }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.200' }}>Street Address*</Typography>
                  <TextField name="address" value={shippingAddress.address} onChange={handleAddressChange} fullWidth variant="filled" size="small" InputLabelProps={{ shrink: true }} inputProps={{ sx: { color: 'white' } }} sx={{ bgcolor: '#2a2a2a', borderRadius: 1, '& .MuiFilledInput-root': { bgcolor: '#2a2a2a', '&:hover': { bgcolor: '#383838' }, '&.Mui-focused': { bgcolor: '#383838' } } }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.200' }}>City*</Typography>
                  <TextField name="city" value={shippingAddress.city} onChange={handleAddressChange} fullWidth variant="filled" size="small" InputLabelProps={{ shrink: true }} inputProps={{ sx: { color: 'white' } }} sx={{ bgcolor: '#2a2a2a', borderRadius: 1, '& .MuiFilledInput-root': { bgcolor: '#2a2a2a', '&:hover': { bgcolor: '#383838' }, '&.Mui-focused': { bgcolor: '#383838' } } }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.200' }}>State/Province*</Typography>
                  <TextField name="state" value={shippingAddress.state} onChange={handleAddressChange} fullWidth variant="filled" size="small" InputLabelProps={{ shrink: true }} inputProps={{ sx: { color: 'white' } }} sx={{ bgcolor: '#2a2a2a', borderRadius: 1, '& .MuiFilledInput-root': { bgcolor: '#2a2a2a', '&:hover': { bgcolor: '#383838' }, '&.Mui-focused': { bgcolor: '#383838' } } }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.200' }}>ZIP/Postal Code*</Typography>
                  <TextField name="zipCode" value={shippingAddress.zipCode} onChange={handleAddressChange} fullWidth variant="filled" size="small" InputLabelProps={{ shrink: true }} inputProps={{ sx: { color: 'white' } }} sx={{ bgcolor: '#2a2a2a', borderRadius: 1, '& .MuiFilledInput-root': { bgcolor: '#2a2a2a', '&:hover': { bgcolor: '#383838' }, '&.Mui-focused': { bgcolor: '#383838' } } }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'grey.200' }}>Country*</Typography>
                  <FormControl fullWidth variant="filled" size="small" sx={{ bgcolor: '#2a2a2a', borderRadius: 1, '& .MuiFilledInput-root': { bgcolor: '#2a2a2a', '&:hover': { bgcolor: '#383838' }, '&.Mui-focused': { bgcolor: '#383838' } } }}>
                    <Select labelId="country-label" id="country" name="country" value={shippingAddress.country} onChange={handleAddressChange as any} sx={{ color: 'white', '& .MuiSelect-icon': { color: 'white' } }}>
                      <MenuItem value="USA">United States</MenuItem>
                      <MenuItem value="CAN">Canada</MenuItem>
                      <MenuItem value="GBR">United Kingdom</MenuItem>
                      <MenuItem value="AUS">Australia</MenuItem>
                      <MenuItem value="JPN">Japan</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
             <Button 
                 onClick={handleProceedToSquareCheckout}
                 variant="contained"
                 fullWidth
                 disabled={apiLoading}
                 startIcon={apiLoading ? <CircularProgress size={20} color="inherit" /> : null}
                 sx={{ 
                     mt: 2, 
                     bgcolor: 'red', 
                     '&:hover': { bgcolor: '#c00' }, 
                     py: 1.2, 
                     fontWeight: 'bold', 
                     textTransform: 'uppercase', 
                     fontSize: '0.9rem', 
                     '&.Mui-disabled': {
                         bgcolor: 'grey.700',
                         color: 'grey.500'
                     }
                 }}
             >
                 {apiLoading ? 'Processing...' : 'Proceed to Checkout'}
             </Button>
           </Box>
        </Paper>
        
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 4 }}>
          <Button
            component={Link}
            href="/"
            startIcon={<FaArrowLeft />}
            sx={{ 
              color: 'grey.400', 
              textTransform: 'uppercase', 
              fontSize: '0.8rem', 
              fontWeight: 'bold',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Continue Shopping
          </Button>
        </Stack>

      </Container>
    </Box>
  );
}; 