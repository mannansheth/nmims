const displayChart = () => {
  const data = localStorage.getItem('userdata');
  const parsed_data = JSON.parse(data);
  if (!parsed_data) {
    console.log('err, login');
    const container = document.getElementById('chart-container');
    container.innerHTML = `
    <center>
    <h2> Please login first to view attendance </h2>
    </center>
    `
  } else if (!parsed_data.attendance) {
    console.log('err, login');
    const container = document.getElementById('chart-container');
    container.innerHTML = `
    <center>
    <h2> Attendance information not available </h2>
    </center>
    `
  } else {
    const chart_header = document.getElementById('chart-header');
    const sap = localStorage.getItem('sap');
    chart_header.innerHTML = `
    <center>
    <h3> Overall attendance report for </h3>
    <h4> SAP ID: ${sap} </h4>
    <h4> Name: ${parsed_data.fullName} </h4>
    </center>`
    const ctx = document.getElementById('attendanceChart').getContext('2d');
    const current_attendance = parsed_data.attendance;
    const chart_data = {
      labels: ['Attended (%)', 'Missed (%)'],
      datasets: [{
        data: [current_attendance, 100 - current_attendance], 
        backgroundColor: ['#4CAF50', '#FF5252'],
      }]
    };
    const config = {
      type: 'pie',
      data: chart_data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text:"out of 100%"
          }
        }
      }
    };
    new Chart(ctx, config);
  }
}
displayChart();