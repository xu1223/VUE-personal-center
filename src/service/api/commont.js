import Base from './base.js'

export default Base({
    getReviewsPager: { // 获取评论列表
        method: 'post',
        url: '/api/review/get_reviews_pager'
    },
    getReview:{ //获取评价详情
        method: 'post',
        url: '/api/review/get_review'
    },
    reviewImageUpload:{ //评论图片上传方法 
        method: 'post',
        url: '/api/review/review_image_upload'
    },
    reviewEdit:{ //修改评论 
        method: 'post',
        url: '/api/review/review_edit'
    },
    getWillCommentOrder:{ //获取待评价订单数据
        method: 'post',
        url: '/api/cart/get_will_comment_order'
    },
    multiReviewAdd:{ //添加评论-多商品
        method: 'post',
        url: '/api/review/multi_review_add'
    },
    getWillCommentProduct:{ //获取待评价订单数据
        method: 'post',
        url: '/api/cart/get_will_comment_product'
    },
});