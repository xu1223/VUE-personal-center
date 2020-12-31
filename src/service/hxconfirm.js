import Vue from 'vue'
import HxConfirm from '@/components/HxConfirm.vue'

HxConfirm.Insetarer = props => {
  const Instarsc = new Vue({
    render(h) {
      return h(HxConfirm, {
        props
      })
    }
  }).$mount()
  document.body.appendChild(Instarsc.$el)
  const ins = Instarsc.$children[0]
  return ins
}
let msgInseta = null

function getInstance() {
  msgInseta = msgInseta || HxConfirm.Insetarer()
  return msgInseta
}

export default {
  info({ title, content, btnNum, leftbtn, leftfunc, rightbtn, rightfunc,tips }) {
    getInstance().add({
      title, content, btnNum, leftbtn, leftfunc, rightbtn, rightfunc ,tips
    })
  }
}