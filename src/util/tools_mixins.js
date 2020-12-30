import { Base64 } from "js-base64";
import iJson from "@/util/iJson";
import { generateSessionId, sendParamInUrl } from "@/util/tools.js";
export default {
    data() {
        return {
          iJsonData:iJson(),
        }
    },
    methods: {
        linkUrl(item) {
            sendParamInUrl(item);
        },
        setCount(type,num,num2) {
            // 1:心愿清单加入购物车  2:心愿清单删除 3:购物车加入心愿清单 4:购物车删除 5:添加购物车
            let count = {
                count_cart:type==5? num : Number(this.$storage.getCount()?this.$storage.getCount().count_cart:0) + Number(type == 1 ? +num : type == 2 ? 0 : type == 3 ? -num : type == 4 ? -num:0),
                count_wishlist: Number(this.$storage.getCount()?this.$storage.getCount().count_wishlist:0) + Number(type == 1 ? -num : type == 2 ? -num : type == 3 ? +num2 : type == 4 ? 0 : 0),
            }
            this.$storage.setCount(count);
            this.$store.commit("bag/wish_total_num", count.count_wishlist);
            this.$store.commit("bag/bag_total_num", count.count_cart);
        },
        getCountries(){
            this.$Http.common.getCountries().then(res => {
                let { code, data } = res;
                if (code == 200) {
                    this.param.countries_list=data||[];
                    this.iJsonData=iJson(this.param);
                }
            });
        },
        getCountryZone(id){
            this.$Http.common.getCountryZone({ country_id: id }).then(res => {
                let { code, data } = res;
                if (code == 200) {
                    this.param.zone_list=data;
                    this.iJsonData=iJson(this.param);
                }
            });
        },
        getAllWishlistProductIds(){
            this.$Http.common.getAllWishlistProductIds().then(options => {
                let { code, data } = options;
                if (code == 200) {
                    this.$storage.setWishlistIds(data);
                }
            });
        },
        getTotalCartWishCount(){
            this.$Http.common.getTotalCartWishCount({ session_id: generateSessionId()?generateSessionId():this.$route.query.session_id }).then(res => {
                let { code, data, msg } = res;
                if (code == 200) {
                    this.$storage.setCount(data)
                    this.$store.commit("bag/wish_total_num", data.count_wishlist);
                    this.$store.commit("bag/bag_total_num", data.count_cart);
                }
            });
        },
        filter(val, item) {
            const input = val.toLocaleUpperCase();
            return item.name.toLocaleUpperCase().indexOf(input) >= 0;
        }
    }
}