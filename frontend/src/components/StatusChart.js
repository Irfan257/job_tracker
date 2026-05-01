import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';

function StatusChart({ applications }) {
  const data = [
    { name: 'Applied', count: applications.filter(a => a.status === 'Applied').length, fill: '#0d6efd' },
    { name: 'Interview', count: applications.filter(a => a.status === 'Interview').length, fill: '#ffc107' },
    { name: 'Offer', count: applications.filter(a => a.status === 'Offer').length, fill: '#198754' },
    { name: 'Rejected', count: applications.filter(a => a.status === 'Rejected').length, fill: '#dc3545' },
  ];

  return (
    <div className="card p-3 mb-4">
      <h5 className="mb-3">Applications by Status</h5>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <rect key={index} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatusChart;