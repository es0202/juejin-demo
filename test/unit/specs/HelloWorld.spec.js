import {
  shallowMount,
  mount,
  createLocalVue
} from "@vue/test-utils"
import ElementUI from 'element-ui'
import Vue from 'vue'
import NestedRoute from "@/test.vue"
import header from '@/components/header/header'
Vue.use(ElementUI)
describe("header", () => {
  const $route = {
    path: '/home/',
    matched:[{path: "/home"}]
    // ...其他属性
  }

  const $router = {
    push: '/home/recommend'
    // ... 其他属性
  }

  const wrapper = mount(header, {
    mocks: {
      $route,
      $router
    },stubs: ['router-link', 'router-view']
  })
  it('render test', () => {
    // const wrapper = mount(header)
    expect(wrapper.html()).toContain('<div class="test"></div>')
  })


  it("renders a child component via routing", () => {
    // const wrapper = mount(App, { localVue, router })

    // router.push("/nested-route")

    // expect(wrapper.find(NestedRoute).exists()).toBe(true)

  })
})
