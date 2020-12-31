import Vue from 'vue'

export default {
    confirm(opt) {
        Vue.$modal.confirm({
            iconType: '',
            maskClosable: false,
            title:opt.title,
            content: opt.content,
            okText: opt.okText || 'CONFIRM',
            cancelText: opt.cancelText || 'CANCEL',
            onOk: function () {
                opt.onOk.call()
            },
            onCancel: function () {
                if (opt.onCancel) {
                    opt.onCancel.call()
                }
            },
            width: 500
        })
    },
    allCart(opt) {
        Vue.$modal.confirm({
            closable: true,
            iconType: false,
            maskClosable: true,
            title: opt.title,
            content: `      
      <div class="flex5 single_item">
        <a>
          <img src="${opt.content.img_m}" />
        </a>
        <div>
          <a >${opt.content.name}</a>
          <v-rate disabled :value="${opt.content.review_rating}"></v-rate>
          <p>SIZE: ${opt.content.size}</p>
          <p>COLOR: ${opt.content.color}</p>
          <p>QTY: ${opt.content.quantity}</p>
        </div>
      </div>
      <p class="single_item_p">${opt.tips}</p>`,
            okText: 'CONFIRM',
            cancelText: 'CANCEL',
            onOk: function () {
                opt.onOk.call()
            },
            onCancel: function () {
            },
            width: 550
        })
    },
    info(opt) {
        Vue.$modal.info({
            iconType: false,
            maskClosable: true,
            title: opt.title,
            content: opt.content,
            okText: 'CONFIRM',
            onOk: function () {
            }
        })
    },
}