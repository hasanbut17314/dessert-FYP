import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, ShoppingCart, DollarSign, Package } from 'lucide-react';

const Dashboard = () => {
  const salesData = [
    { month: 'Jan', sales: 4000, orders: 240 },
    { month: 'Feb', sales: 3000, orders: 198 },
    { month: 'Mar', sales: 5000, orders: 320 },
    { month: 'Apr', sales: 2780, orders: 190 },
    { month: 'May', sales: 1890, orders: 120 },
    { month: 'Jun', sales: 6390, orders: 390 },
    { month: 'Jul', sales: 3490, orders: 250 },
  ]

  const statCards = [
    { 
      title: "Total Users", 
      value: "5,240", 
      change: "+12.5%", 
      icon: <Users size={24} className="text-blue-500" />,
      color: "bg-blue-100 text-blue-800"
    },
    { 
      title: "Total Orders", 
      value: "1,708", 
      change: "+8.2%", 
      icon: <ShoppingCart size={24} className="text-green-500" />,
      color: "bg-green-100 text-green-800"
    },
    { 
      title: "Revenue", 
      value: "$24,590", 
      change: "+18.3%", 
      icon: <DollarSign size={24} className="text-purple-500" />,
      color: "bg-purple-100 text-purple-800"
    },
    { 
      title: "Products", 
      value: "432", 
      change: "+5.7%", 
      icon: <Package size={24} className="text-orange-500" />,
      color: "bg-orange-100 text-orange-800"
    },
  ];

  const topProducts = [
    { id: 1, name: "Mango Shake", price: "$299", sales: 156 },
    { id: 2, name: "Chocolate icecream", price: "$89", sales: 145 },
    { id: 3, name: "Smart Chips", price: "$24", sales: 132 },
    { id: 4, name: "Harry Potter's Galleto", price: "$19", sales: 124 },
    { id: 5, name: "Monitor desert", price: "$59", sales: 98 },
  ];

  return (
    <div className="space-y-6">
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
              data={salesData}
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
      
      {/* Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                {topProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3 whitespace-nowrap">{product.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{product.price}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{product.sales}</td>
                  </tr>
                ))}
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
                data={[
                  { name: 'Electronics', value: 4000 },
                  { name: 'Clothing', value: 3000 },
                  { name: 'Home', value: 2000 },
                  { name: 'Books', value: 2780 },
                  { name: 'Other', value: 1890 },
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Sales ($)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;