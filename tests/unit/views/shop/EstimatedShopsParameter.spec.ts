import Vuetify from "vuetify";
import Vue from "vue";
import { createLocalVue, mount, shallowMount, Wrapper } from "@vue/test-utils";
import EstimatedShopsParameter from '@/views/shop/EstimatedShopsParameter.vue'
import ShopSegmentationService from "@/services/shop/ShopSegmentation.service";
import { mockAxiosPromise } from "../../../__utils__/axios";
import EstimatedMarketService from "@/services/market/EstimatedMarketService";

type RelaxedVue = Wrapper<
    EstimatedShopsParameter & { [key: string]: any }
>;


describe('EstimatedShopsParameter.vue', () => {

    const localVue = createLocalVue();
    let vuetify: Vuetify;

    const mountFunction = (options?: any, shallow = true): RelaxedVue => {
        const opts = {
            localVue,
            vuetify,
            ...options,
        };
        return shallow
            ? shallowMount(EstimatedShopsParameter, opts)
            : mount(EstimatedShopsParameter, opts);
    };

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('props pass well', () => {
        

        const spy = jest.spyOn(ShopSegmentationService, "getShopSegmentation").mockReturnValue(mockAxiosPromise([
            {
                id: "1",
                line: "1",
                wording: "wordingTest",
                segmentationType: "segmentationTest",
                order: 1,
                activite: "activiteTest"
            }]
        ));

        const spyGetEstimatedMarkets = jest.spyOn(EstimatedMarketService, "getEstimatedMarkets");

        const wrapper: RelaxedVue = mountFunction({}, false);

        wrapper.find('#id-test').trigger('click');
        expect(spy).toHaveBeenCalled();
        expect(spyGetEstimatedMarkets).not.toHaveBeenCalled();
    });

    /*it('props pass well', () => {
        

        const spy = jest.spyOn(ShopSegmentationService, "getShopSegmentation").mockReturnValue(mockAxiosPromise([
            {
                id: "1",
                line: "1",
                wording: "wordingTest",
                segmentationType: "segmentationTest",
                order: 1,
                activite: "activiteTest"
            }],
            500
        ));


        const wrapper: RelaxedVue = mountFunction();
        Vue.nextTick(() => {
            expect(wrapper.vm.alerts).toStrictEqual([{show: true, message: "Erreur lors de la récupération des critères", type: "error"}]);
        })
        
    });*/

    it("should not search without implantation value", async () => {
        const wrapper: RelaxedVue = mountFunction({
            propsData: {
            }
        }, false);
        Vue.nextTick(() => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
})
