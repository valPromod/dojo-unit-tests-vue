import Vuetify from "vuetify";
import Vue from "vue";
import { createLocalVue, mount, shallowMount, Wrapper } from "@vue/test-utils";
import EstimatedShopsParameterData from '@/components/shop/EstimatedShopsParameterData.vue'

type RelaxedVue = Wrapper<
EstimatedShopsParameterData  & { [key: string]: any }
>;


describe('HelloWorld.vue', () => {
  it('props pass well', () => {
    const localVue = createLocalVue();
    const vuetify: Vuetify  = new Vuetify();

    const yearWeeks = ['202245', '202246']
    const wrapper: RelaxedVue = shallowMount(EstimatedShopsParameterData, {
      localVue,
      vuetify,
      propsData: { yearWeeks : ['202245', '202246'] },
      computed :{
        title : jest.fn(),
      },
      methods: {
        onEstimatedShopsMarketOriginalChange : jest.fn()
      }
    })
    //wrapper.vm.onEstimatedShopsMarketOriginalChange : jest.fn();
    wrapper.setData({market: "101"});
    expect(wrapper.vm.yearWeeks).toStrictEqual(yearWeeks);
  });

  it("should not search without implantation value", async () => {
    const localVue = createLocalVue();
    const vuetify: Vuetify  = new Vuetify();
    const wrapper: RelaxedVue = shallowMount(EstimatedShopsParameterData, {
      localVue,
      vuetify,
      propsData: { yearWeeks : ['202245', '202246'] },
      computed :{
        title : jest.fn(),
      },
      methods: {
        onEstimatedShopsMarketOriginalChange : jest.fn()
      }
    })
    Vue.nextTick(() => {
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
})
