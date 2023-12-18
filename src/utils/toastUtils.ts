import { notification } from 'ant-design-vue';

const openNotificationWithIcon = (title: string, description: string, type: string) => {
  notification.open({
    message: title,
    description: description,
    duration: 3,
    placement: 'bottomRight',
    type: type as any
  });
};
const open = (title: string, description: string, type: string) =>
  openNotificationWithIcon(title, description, type);

export const TYPES_OF_TOAST = {
  SUCCESS: 'success',
  ERROR: 'error'
};

export function getToastStatus(type: string, data: any = ''): void {
  let message = 'Ocorreu um erro inesperado!';
  if (type === TYPES_OF_TOAST.ERROR) {
    if (typeof data === 'object') {
      if (data.response.data && typeof data.response.data.message === 'string') {
        message = data.response.data.message;
      } else if (
        data.response.data &&
        data.response.data.message &&
        data.response.data.message[0].message
      ) {
        message = data.response.data.message[0].message;
      }
    } else if (typeof data === 'string') {
      message = data;
    } else if (data === '' || data === undefined) {
      message = 'Ocorreu um erro inesperado!';
    }

    open('Erro', message, TYPES_OF_TOAST.ERROR);
  } else if (type === TYPES_OF_TOAST.SUCCESS) {
    open('Sucesso', message, TYPES_OF_TOAST.SUCCESS);
  }
}
