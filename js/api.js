// api.js - Axios-based data exchange simulation
// Demonstrates: Axios for HTTP requests, async/await, Promise handling

/**
 * Simulated API: Fetch products from a mock endpoint
 * Demonstrates: axios.get(), JSON response parsing
 * 
 * In a real scenario, this would fetch from a server.
 * Here we simulate the API call and return our product data.
 */
export async function fetchProductsFromAPI() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would be:
    // const response = await axios.get('/api/products');
    // return response.data;
    
    // For this demo, we'll simulate a successful API response
    const mockResponse = {
      status: 200,
      data: {
        success: true,
        message: 'Products fetched successfully',
        timestamp: new Date().toISOString(),
        count: 50
      }
    };
    
    console.log('📡 API Call: GET /api/products', mockResponse);
    return mockResponse.data;
    
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
}

/**
 * Simulated API: Post transaction to server
 * Demonstrates: axios.post(), sending data in request body
 * 
 * This simulates sending a completed transaction to a backend server
 */
export async function postTransactionToAPI(transaction) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In a real app, this would be:
    // const response = await axios.post('/api/transactions', transaction);
    // return response.data;
    
    // For this demo, we'll use axios to make a POST to a mock endpoint
    // We'll use JSONPlaceholder as a testing endpoint
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: `Transaction #${transaction.transactionId}`,
      body: JSON.stringify(transaction),
      userId: 1
    });
    
    console.log('📡 API Call: POST /api/transactions', {
      status: response.status,
      data: response.data,
      transactionId: transaction.transactionId,
      totalAmount: transaction.totalAmount
    });
    
    return {
      success: true,
      message: 'Transaction posted successfully',
      serverId: response.data.id,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
}

/**
 * Simulated API: Fetch daily sales report
 * Demonstrates: axios with query parameters
 */
export async function fetchDailySalesReport(date) {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // In a real app:
    // const response = await axios.get('/api/reports/daily', {
    //   params: { date: date }
    // });
    
    const mockResponse = {
      status: 200,
      data: {
        success: true,
        date: date,
        message: 'Daily report generated',
        timestamp: new Date().toISOString()
      }
    };
    
    console.log('📡 API Call: GET /api/reports/daily', mockResponse);
    return mockResponse.data;
    
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
}

/**
 * Simulated API: Get product stock status
 * Demonstrates: axios.get() with path parameters
 */
export async function getProductStock(productId) {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Simulate random stock levels
    const mockStock = Math.floor(Math.random() * 100) + 10;
    
    const mockResponse = {
      status: 200,
      data: {
        productId: productId,
        stockLevel: mockStock,
        available: mockStock > 0,
        timestamp: new Date().toISOString()
      }
    };
    
    console.log(`📡 API Call: GET /api/products/${productId}/stock`, mockResponse);
    return mockResponse.data;
    
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
}

/**
 * Helper function to handle API errors
 * Demonstrates: error handling patterns
 */
export function handleAPIError(error) {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data.message || 'Server error occurred',
      status: error.response.status
    };
  } else if (error.request) {
    // Request made but no response
    return {
      message: 'No response from server',
      status: 0
    };
  } else {
    // Error in request setup
    return {
      message: error.message || 'Request failed',
      status: -1
    };
  }
}
