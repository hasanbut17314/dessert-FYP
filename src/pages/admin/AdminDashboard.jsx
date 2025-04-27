import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, ShoppingCart, DollarSign, Package } from 'lucide-react';
import { apiService } from '../../lib/axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {

  const [totalAnalytics, setTotalAnalytics] = useState({});
  const [loading, setLoading] = useState(true);

  const [topProducts, setTopProducts] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);

  const fetchTotalAnalytics = async () => {
    setLoading(true);
    try {
      const response = await apiService.get('/analytics/totalAnalytics');
      setTotalAnalytics(response?.data?.data);
    } catch (error) {
      console.error('Error fetching total analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalAnalytics();
  }, []);

  const fetchTopProducts = async () => {
    try {
      const response = await apiService.get('/analytics/topProducts');
      setTopProducts(response?.data?.data);
    } catch (error) {
      console.error('Error fetching top products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopProducts();
  }, []);

  const fetchSalesByCategory = async () => {
    try {
      const response = await apiService.get('/analytics/salesByCategory');
      setTopCategories(response?.data?.data);
    } catch (error) {
      console.error('Error fetching sales by category:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesByCategory();
  }, []);

  const fetchMonthlySales = async () => {
    try {
      const response = await apiService.get('/analytics/monthlySalesOverview');
      setMonthlySales(response?.data?.data);
    } catch (error) {
      console.error('Error fetching monthly sales:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlySales();
  }, []);

  const salesData = [
    { month: 'Jan', sales: 4000, orders: 240 },
    { month: 'Feb', sales: 3000, orders: 198 },
    { month: 'Mar', sales: 5000, orders: 320 },
    { month: 'Apr', sales: 2780, orders: 190 },
    { month: 'May', sales: 1890, orders: 120 },
    { month: 'Jun', sales: 6390, orders: 390 },
    { month: 'Jul', sales: 3490, orders: 250 },
  ]

  console.log(monthlySales, 'monthlySales');


  const statCards = [
    {
      title: "Total Users",
      value: totalAnalytics?.totalUsers || 0,
      change: "+12.5%",
      icon: <Users size={24} className="text-blue-500" />,
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Total Orders",
      value: totalAnalytics?.totalOrders || 0,
      change: "+8.2%",
      icon: <ShoppingCart size={24} className="text-green-500" />,
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Revenue",
      value: totalAnalytics?.revenue || 0,
      change: "+18.3%",
      icon: <DollarSign size={24} className="text-purple-500" />,
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Products",
      value: totalAnalytics?.totalProducts || 0,
      change: "+5.7%",
      icon: <Package size={24} className="text-orange-500" />,
      color: "bg-orange-100 text-orange-800"
    },
  ];

  return (
    <div className="space-y-6 mt-12 md:m-0">
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <div className="flex items-center mt-1">
                  <TrendingUp size={16} className="text-green-500 mr-1" />
                  <span className="text-sm text-green-600">{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.color.split(' ')[0]}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlySales}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Sales ($)"
              />
              <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#82ca9d" name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts?.length > 0 ? topProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="px-4 py-3 whitespace-nowrap">{product.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{product.price}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{product.quantity}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-3 whitespace-nowrap text-center">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topCategories}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalSales" name="Sales ($)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;