import { UsergroupAddOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';

export const navbarItems = [
  {
    key: '/users',
    icon: () => h(UsergroupAddOutlined),
    label: h('a', { href: '/users' }, 'Usuários'),
    title: 'Usuários',
    path: '/users'
  },
  {
    key: '/roles',
    icon: () => h(AppstoreOutlined),
    label: h('a', { href: '/roles' }, 'Cargos'),
    title: 'Cargos',
    path: '/roles'
  }
];
