import { api } from 'boot/axios'

export default function useApi (url) {
  const list = async (page = 0) => {
    try {
      const { data } = await api.get(url, { params: { page } })
      return data.data.entities
    } catch (error) {
      throw new Error(error)
    }
  }

  const paginationData = async () => {
    try {
      const { data } = await api.get(url)
      return data.data.pagination
    } catch (error) {
      throw new Error(error)
    }
  }

  const getById = async (id) => {
    try {
      const { data } = await api.get(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const post = async (form) => {
    try {
      const { data } = await api.post(url, form)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const update = async (form) => {
    try {
      const { data } = await api.put(`${url}/${form.house_rules.id}`, form)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const remove = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    list,
    post,
    update,
    remove,
    getById,
    paginationData
  }
}
