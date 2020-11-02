const { interopDefault } = require("next/dist/next-server/server/load-components");
const subjectRouting = require('pages/subject/[subject]/index');

import SubjectService from 'src/services/SubjectService';

jest.mock('src/services/SubjectService');

describe("Subject routing tests", () => {

    it("Should return 404 if subject not found", async () => {

        SubjectService.GetSubjectByID.mockRejectedValue({   
            response: {        
                status: 404,
            }
          });

        const params = {  };
        const received = await subjectRouting.getServerSideProps({ params });
        expect(received.props.response).toEqual(404);
    });

    it('Return page when routed to it with subject/{subjectname}', async () => {

        SubjectService.GetSubjectByID.mockResolvedValue({
            response: {status: 200},
            data: 
            {
                id: 1,
                subjectName: 'cooking',
                questions: [{ title: 'how to dice onion?', description: 'step 1: hello, step 2: hello' }]
            }
          });

        const params = { subject: 'cooking' };
        const received = await subjectRouting.getServerSideProps({ params });
        expect(received.props.response.subjectName).toEqual('cooking');
    });
});
