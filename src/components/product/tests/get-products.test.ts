
import { TestHelper } from '../../../configs/ci-test-config/test-helper';


describe('Test ProductionController', () => {
    const factory: TestHelper = new TestHelper();
    beforeAll(async () => {
        await factory.init();
    });

    afterAll(async () => {
        await factory.close();
    });

    it('Get /products ', async () => {
        const {xApiKey} = factory.appConfig;
        const result = await factory.request.get('/products')
        .set(`x-api-key`, xApiKey).send();
        expect(result.status).toBe(200);
        expect(result.body).toMatchObject([{"id":"7ec2122a-b951-428a-8750-aeede5c1ee1b","name":"Product 1","price":50,"brand":"Adidas","status":null,"productGroupId":"c8c1d215-b3cb-49bf-abf9-a3e23745c019","createdAt":"2022-04-26T02:50:21.476Z","updatedAt":"2022-04-26T02:50:21.476Z"},{"id":"f4a6f036-084f-4070-83fc-2c4df029f09f","name":"Product 2","price":50,"brand":"Nike","status":null,"productGroupId":"df0cab8e-4db5-4bc3-afb6-6d73e9f83eca","createdAt":"2022-04-26T02:50:29.840Z","updatedAt":"2022-04-26T02:50:29.840Z"},{"id":"bec7c3e9-3402-48af-a635-022cc01f86ae","name":"Product 3","price":50,"brand":"Rock","status":null,"productGroupId":"14e1b6a7-4c12-4875-bc81-321c3b9a1ddc","createdAt":"2022-04-26T02:50:51.081Z","updatedAt":"2022-04-26T02:50:51.081Z"}]);
    });
});