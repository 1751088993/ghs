import Vue from 'vue';
import Router from 'vue-router';

import index from './views/index.vue';

Vue.use(Router);

//异步加载component时，在某些浏览器环境(万年历，QQ)中会存在找不到文件的错误
//改为提前加载
export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index
  }],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});

