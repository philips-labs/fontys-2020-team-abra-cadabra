//react
import React from 'react';
import {useEffect} from 'react';
//bootstrap
import { Container, Row, Col, Carousel} from 'react-bootstrap';
//components
import NavBar from 'src/components/NavBar';
import SideBar from 'src/components/SideBar'
import Dashboard_SubjectCard from 'src/components/Dashboard/Dashboard_SubjectCard';
import Dashboard_ExpertCard from 'src/components/Dashboard/Dashboard_ExpertCard';
import Dashboard_HotCarousel from 'src/components/Dashboard/Dashboard_HotCarousel';
//Bar chart
import {Bar, Chart} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const data = {
  labels: ['Cooking', 'Gaming', 'Subject', 'Subject', 'Subject', 'Subject', 'Subject', 'Subject'],
  datasets: [
    {
      label: 'Hot topics', 
      backgroundColor: '#17A2B8',
      data: [90, 85, 65, 59, 80, 81, 56, 55]
    }
  ]
};

const BarOptions = {
  tooltips: {
    enabled: false
  },
  plugins: {
    datalabels: {
       display: true,
       color: 'white',
       anchor: 'end',
       align: 'top'
    }
 },
  legend: {
    display: false,
    labels: {
        fontSize: 10,
        fontStyle: 'bold',
        fontFamily: 'Roboto',
    },
 },
  scales: {
      yAxes: [{
          display: false,
          ticks: {
              suggestedMin: 0, // minimum will be 0, unless there is a lower value.
              suggestedMax: 110,   //heighest value + a little bit 
              // OR //
              beginAtZero: true,   // minimum value will be 0.
              stepSize: 2
          }
      }],
      xAxes: [{
        gridLines: {
          display: false,
        },
        ticks: {
            fontColor: "white",
            fontSize: 12,
            stepSize: 1,
            beginAtZero: true
        }
    }]
  }
};

export default function Dashboard() {

    //register color plugin for chart
    useEffect(() => {
      Chart.plugins.register({
        beforeDraw: function(chartInstance, easing) {
          var ctx = chartInstance.chart.ctx;
          ctx.fillStyle = '#6C757D'; // your color here
      
          var chartArea = chartInstance.chartArea;
          ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
        }
      });
    });

  Chart.plugins.register({
    beforeDraw: function(chartInstance, easing) {
      var ctx = chartInstance.chart.ctx;
      ctx.fillStyle = 'red'; // your color here
  
      var chartArea = chartInstance.chartArea;
      ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
    }
  });

  return (
    <>
      <NavBar />
      <Container fluid className="h-100">
      <Row className="h-100">
        {/* Sidebar col xl={2} md={3} */}
        <SideBar />
        {/*Dashboard Content */}
          <Col xl={9} md={9} className="mx-auto">
              {/* Greetings + time */}
              <Row className="mt-4">
                <Col md={5}><h3 className="WelcomingText">Welcome admin@adminemail.com</h3></Col>
                <Col md={3}></Col>
                <Col md={4}><h3 className="WelcomingText">11 november 2020 15:33</h3></Col>
              </Row>
              {/* Push */}
              <Row className="mt-2 mb-4">
                </Row>
              {/* Subjects & Hot right now */}
              <Row className="mx-auto mb-4">
                <Col md={6} xs={12} className="mb-4 pr-auto">
                  {/* Title */}
                  <Row className="mb-2 mx-auto">
                    <Col>
                      <Row className="border-bottom border-secondary Box">
                        <Col md={8} className=""><h3 className="BoxTitle mb-1">Subjects</h3></Col>
                        <Col md={4} className=""><a className="BoxTitleLink">see all</a></Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* Content */}
                  <Row className="mx-auto">
                    {/* Subjects */}
                    <Dashboard_SubjectCard SubjectName={"Cooking"} />
                    <Dashboard_SubjectCard SubjectName={"Gaming"} />
                    <Dashboard_SubjectCard SubjectName={"Subject"} />
                    <Dashboard_SubjectCard SubjectName={"Subject"} />
                  </Row>
                </Col>
                <Col md={6} xs={12} className="mb-4 pl-auto">
                  {/* Title */}
                  <Row className="mb-2 mx-auto">
                    <Col>
                      <Row className="border-bottom border-secondary Box">
                        <Col md={8} className=""><h3 className="BoxTitle mb-1">Hot right now</h3></Col>
                        <Col md={4} className=""><a className="BoxTitleLink">definition of hot</a></Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* Content */}
                  <Row className="CarouselRow mx-auto">
                    {/* Hot carousel */}
                    <Dashboard_HotCarousel />
                  </Row>
                </Col>
              </Row>
              {/* Hot by data & Expert verify */}
              <Row className="mx-auto mb-4">
                <Col md={6} xs={12} className="mb-4 pr-auto">
                  {/* Title */}
                  <Row className="mb-2 mx-auto">
                    <Col>
                      <Row className="border-bottom border-secondary Box">
                        <Col md={8} className=""><h3 className="BoxTitle mb-1">Hot by data</h3></Col>
                        <Col md={4} className=""><a className="BoxTitleLink">about this graph</a></Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* Content */}
                  <Row className="mx-auto">
                    {/* Barchart of hot data */}
                    <Col className="mt-2 p-0"><Bar data={data} options={BarOptions} width={250} height={120}/></Col>
                  </Row>
                </Col>

                <Col md={6} xs={12} className="mb-4 pl-auto">
                  {/* Title */}
                  <Row className="mb-2 mx-auto">
                    <Col>
                      <Row className="border-bottom border-secondary Box">
                        <Col md={9} className=""><h3 className="BoxTitle mb-1">Experts awaiting verification</h3></Col>
                        <Col md={3} className=""><a className="BoxTitleLink">View all</a></Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* Content */}
                  <Row className="mx-auto">
                    {/* Experts to verify */}
                    <Dashboard_ExpertCard Username={"Verylonglongusername"} />
                    <Dashboard_ExpertCard Username={"Verylonglongusername"} />
                    <Dashboard_ExpertCard Username={"Verylonglongusername"} />
                    <Dashboard_ExpertCard Username={"Verylonglongusername"} />
                    <Dashboard_ExpertCard Username={"Verylonglongusername"} />
                  </Row>
                </Col>
              </Row>
          </Col>
      </Row>

      </Container>
    </>
  )
}
