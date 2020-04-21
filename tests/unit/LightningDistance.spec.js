import { shallowMount } from '@vue/test-utils'
import LightningDistance from '@/views/LightningDistance.vue'

describe('LightningDistance.vue', () => {
  it('Test distance calculator form', async () => {
    const wrapper = shallowMount(LightningDistance),
          input   = wrapper.find('input'),
          form    = wrapper.find('form')

    input.setValue(10)
    input.trigger('keydown')

    form.trigger('submit')

    await wrapper.vm.$nextTick()

    const span = wrapper.find('span')

    expect(span.text()).toMatch('The lightning is 3430 meters (or 3.43 kilometers) away from you')
  })

  it('Test distance calculator event', () => {
    const wrapper = shallowMount(LightningDistance),
          button  = wrapper.find('button[type=button]')

    button.trigger('click')

    setTimeout(async () => {
      button.trigger('click')

      await wrapper.vm.$nextTick()

      const span = wrapper.find('span')

      expect(span.text()).toMatch('The lightning is 354 meters (or 0.35 kilometers) away from you')

      done()
    }, 100)
  })
})
