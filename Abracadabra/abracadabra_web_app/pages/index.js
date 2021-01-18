import { Container, Row, Col, Image } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import SubjectService from 'src/services/SubjectService';
import Link from "next/link";

function HomePage() {

  const [Subjects, setSubjects] = useState([]);

  useEffect(() => {
    //Get subjects
    SubjectService.GetLandingPageSubjects()
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((error) => {
      });

  }, [Subjects]);
  

  return (
    // html, body and _next div need 100% height to work
    <>
      <div className="container-fluid p-0 m-0 h-100 bg">
        <div className="row h-5 m-0 pt-3">
          <a href="/subjectlistpage" className="mx-auto listlink">
            Click here to see a list of all subjects
          </a>
        </div>
        <div className="row m-0 h-95">
          <div className="circle_container col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12 mx-auto p-0">
            <div className="central_text text-center">
              <Image
                className="mx-auto my-auto LandingLogo"
                src={"/images/Abra_Logo_Centered.png"}
              />
            </div>
            {Subjects[0] != null ? <> 
              <div className="moon_container moon1">
              <Link href={"subject/" + Subjects[0].subjectName}>
                <div className="moon moon1 box leftSideTalk" id={Subjects[0].subjectSize}>
                 {Subjects[0].subjectName}
                </div>
              </Link>
            </div>
            </> : <> </>}
            {Subjects[1] != null ? <> 
            <div className="moon_container moon2">
            <Link href={"subject/" + Subjects[1].subjectName}>
                <div
                  className="moon moon2 box leftSideTalk"
                  id={Subjects[1].subjectSize}
                >
                 {Subjects[1].subjectName}
                </div>
              </Link>
            </div>
            </> : <> </>}
            {Subjects[2] != null ? <> 
            <div className="moon_container moon3">
            <Link href={"subject/" + Subjects[2].subjectName}>
                <div
                  className="moon moon3 box topMiddleTalk2"
                  id={Subjects[2].subjectSize}
                >
                 {Subjects[2].subjectName}
                </div>
              </Link>
            </div>
            </> : <> </>}
            {Subjects[3] != null ? <> 
            <div className="moon_container moon4">
            <Link href={"subject/" + Subjects[3].subjectName}>
                <div className="moon moon4 box topMiddleTalk"  id={Subjects[3].subjectSize}>{Subjects[3].subjectName}</div>
              </Link>
            </div>
            </> : <> </>}
            {Subjects[4] != null ? <> 
            <div className="moon_container moon5">
            <Link href={"subject/" + Subjects[4].subjectName}>
                <div className="moon moon5 box rightSideTalk" id={Subjects[4].subjectSize}>{Subjects[4].subjectName}</div>
              </Link>
            </div>
            </> : <> </>}
            {Subjects[5] != null ? <> 
            <div className="moon_container moon6">
            <Link href={"subject/" + Subjects[5].subjectName}>
                <div className="moon moon6 box rightBottomTalk" id={Subjects[5].subjectSize}>{Subjects[5].subjectName}</div>
              </Link>
            </div>
            </> : <> </>}
            {Subjects[6] != null ? <> 
            <div className="moon_container moon7">
            <Link href={"subject/" + Subjects[6].subjectName}>
                <div className="moon moon7 box bottomMiddleTalk" id={Subjects[6].subjectSize}>{Subjects[6].subjectName}</div>
              </Link>
            </div>
            </> : <> </>}
            {Subjects[7] != null ? <> 
            <div className="moon_container moon8">
            <Link href={"subject/" + Subjects[7].subjectName}>
                <div className="moon moon8 box bottomMiddleTalk" id={Subjects[6].subjectSize}>{Subjects[6].subjectName}</div>
              </Link>
            </div>
            </> : <> </>}

          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
