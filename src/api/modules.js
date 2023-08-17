import { $api } from "."

export const Module = {
  async getGoods(data) {
    $api.get('goods/records')
    .then(res => data(res.data))
  }
}