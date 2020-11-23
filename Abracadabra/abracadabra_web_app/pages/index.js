import { Container, Row, Col } from "react-bootstrap";
// import VideoBackground from '../src/components/VideoBackground'

function HomePage() {
  return (
    // html, body and _next div need 100% height to work
    <>
      <div className="container-fluid p-0 m-0 h-100 bg">
        {/* <div className="row h-100">
                <div className="col-md-12 text-center d-flex">
                    <img className="mx-auto my-auto LandingLogo" src={require('../src/images/Abra_Logo.png')} />  
                </div>
            </div> */}
        <div className="row h-5 m-0 pt-3">
          <a href="/subjectlistpage" className="mx-auto listlink">
            Click here to see a list of all subjects
          </a>
        </div>
        <div className="row m-0 h-95">
          <div className="circle_container col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12 mx-auto p-0">
            <div className="central_text text-center">
              <img
                className="mx-auto my-auto LandingLogo"
                src={require("../src/images/Abra_Logo_Centered.png?webp")}
              />
            </div>
            <div className="moon_container moon1">
              <div className="moon moon1 box leftSideTalk" id="BigSubject">
                Big Subject
              </div>
            </div>
            <div className="moon_container moon2">
              <a href="subject/cooking">
                <div
                  className="moon moon2 box leftSideTalk"
                  id="VeryBigSubject"
                >
                  Cooking
                </div>
              </a>
            </div>{" "}
            {/*h2 className='SubjectTitle'></h3> */}
            <div className="moon_container moon3">
              <div className="moon moon3 box topMiddleTalk2" id="MediumSubject">
                Medium Subject
              </div>
            </div>
            <div className="moon_container moon4">
              <a href="subject/gaming">
                <div className="moon moon4 box topMiddleTalk">Gaming</div>
              </a>
            </div>
            <div className="moon_container moon5">
              <div className="moon moon5 box rightSideTalk">Subject</div>
            </div>
            <div className="moon_container moon6">
              <div className="moon moon6 box rightBottomTalk">Subject</div>
            </div>
            <div className="moon_container moon7">
              <div className="moon moon7 box bottomMiddleTalk">Subject</div>
            </div>
            <div className="moon_container moon8">
              <div className="moon moon8 box bottomMiddleTalk">Subject</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
