import queryString from 'query-string';
import api from './api';

const baseURL = '/users';

export default {
  name: 'userService',

  async create(data: any) {
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
      roles: data.roles
    };

    return api.post(`${baseURL}/`, body).then((response) => response.data);
  },

  async delete(dataId: string) {
    return api.delete(`${baseURL}/${dataId}`).then((response) => response.data);
  },

  async update(data: any) {
    const body = {
      name: data.name,
      email: data.email,
      roles: data.roles
    };

    return api.put(`${baseURL}/${data.id}`, body).then((response) => response.data);
  },

  async updatePassword(data: any) {
    const body = {
      password: data.password,
      confirm_password: data.confirm_password
    };

    return api
      .patch(`${baseURL}/changePassword/${data._id}`, body)
      .then((response) => response.data);
  },

  async updateUserInfos(data: any) {
    const body = {
      name: data.name,
      email: data.email,
      roles: data.roles
    };
    return api.patch(`${baseURL}/${data._id}`, body).then((response) => response.data);
  },

  async getAll(params = {}) {
    const stringParams = queryString.stringify(params, {
      skipNull: true,
      skipEmptyString: true
    });
    return api.get(`${baseURL}/?${stringParams}`).then((response) => response.data);
  },

  async paginate(page = 1, params = {}) {
    const stringParams = queryString.stringify(
      { page, limit: 15, ...params },
      {
        skipNull: true,
        skipEmptyString: true
      }
    );
    return api.get(`${baseURL}/paginate/?${stringParams}`).then((response) => response.data);
  },

  async getById(dataId: string) {
    return api.get(`${baseURL}/${dataId}`).then((response) => response.data);
  },

  async getByEmail(email: string) {
    return api.get(`${baseURL}/getByEmail/${email}`).then((response) => response.data);
  }
};
