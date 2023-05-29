import useApi from 'src/composables/UseApi'

export default function houseRulesService () {
  const { list, post, update, remove, getById, paginationData } = useApi('house_rules')

  return {
    list,
    post,
    update,
    remove,
    getById,
    paginationData
  }
}
