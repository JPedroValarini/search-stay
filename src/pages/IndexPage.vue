<template>
  <q-page padding>
    <q-table
      title="Treats"
      :rows="houseRules"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="delete" color="negative" dense size="sm" @click="deleteHouseRules(props.row.id)"></q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import houseRulesService from 'src/services/houseRules'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const houseRules = ref([])
    const { list, remove } = houseRulesService()
    const columns = [
      { name: 'id', label: 'id', field: 'id', sortable: true, align: 'left' },
      { name: 'name', label: 'name', field: 'name', sortable: true, align: 'left' },
      { name: 'active', label: 'active', field: 'active', sortable: true, align: 'left' },
      { name: 'order', label: 'order', field: 'order', sortable: true, align: 'left' },
      { name: 'actions', label: 'actions', field: 'Ações', align: 'right' }
    ]

    onMounted(() => {
      getHouseRules()
    })

    const getHouseRules = async () => {
      try {
        const data = await list()

        console.log(data)
        houseRules.value = data
      } catch (error) {
        console.error(error)
      }
    }

    const deleteHouseRules = async (id) => {
      try {
        await remove(id)
        await getHouseRules()
        console.log('deletado com sucesso!')
      } catch (error) {
        console.error(error)
      }
    }

    return { houseRules, columns, deleteHouseRules }
  }
})
</script>
