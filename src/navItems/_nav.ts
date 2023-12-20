import { MailOutlined, AppstoreOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';

export const navbarItems = [
  {
    key: '/users',
    icon: () => h(MailOutlined),
    label: h('a', { href: '/users' }, 'Cargos'),
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
