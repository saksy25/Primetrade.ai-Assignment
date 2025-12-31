import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';
import DashboardLayout from '../components/DashboardLayout';
import { CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, tasksRes] = await Promise.all([
        api.get('/tasks/stats/overview'),
        api.get('/tasks?sort=newest')
      ]);

      setStats(statsRes.data.stats);
      setRecentTasks(tasksRes.data.tasks.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats?.total || 0,
      icon: TrendingUp,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Pending',
      value: stats?.pending || 0,
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'In Progress',
      value: stats?.inProgress || 0,
      icon: AlertCircle,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Completed',
      value: stats?.completed || 0,
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2 text-xl">
            Here's what's happening with your tasks today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <div key={stat.title} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Tasks */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Tasks</h2>
            <button
              onClick={() => navigate('/dashboard/tasks')}
              className="text-primary-600 hover:text-primary-700 text-lg font-medium"
            >
              View All
            </button>
          </div>

          {recentTasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No tasks yet</p>
              <button
                onClick={() => navigate('/dashboard/tasks')}
                className="btn-primary"
              >
                Create Your First Task
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div
                  key={task._id}
                  className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer"
                  onClick={() => navigate('/dashboard/tasks')}
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-lg sm:text-xl text-gray-900 mb-1">{task.title}</h3>
                    {task.description && (
                      <p className="text-md text-gray-600 mb-2 line-clamp-1">
                        {task.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-sm px-4 py-2 rounded-full font-medium ${getStatusBadgeClass(task.status)}`}>
                        {task.status}
                      </span>
                      <span className={`text-sm px-4 py-2 rounded-full font-medium ${getPriorityBadgeClass(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 ml-4">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;