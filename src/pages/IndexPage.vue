<template>
  <q-page padding>
    <q-table
      title="Treats"
      :rows="houseRules"
      :columns="columns"
      :loading="loading"
      v-model:pagination="pagination"
      row-key="id"
      @request="onRequest"
    >

    <template v-slot:top>
      <span class="text-h5">Rules</span>
      <q-space />
      <q-btn color="primary" label="New" :to="{ name: 'formHouseRules' }" />
    </template>
    <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" color="info" dense size="sm" @click="editHouseRules(props.row.id)"></q-btn>
          <q-btn icon="delete" color="negative" dense size="sm" @click="deleteHouseRules(props.row.id)"></q-btn>
        </q-td>
      </template>
    </q-table>
    <div class="row justify-center q-mt-md">
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import houseRulesService from 'src/services/houseRules'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const houseRules = ref([])
    const loading = ref(true)
    const { list, remove } = houseRulesService()
    const router = useRouter()
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      sortBy: 'id',
      descending: true
    })

    const columns = [
      { name: 'id', label: 'id', field: 'id', sortable: true, align: 'left' },
      { name: 'name', label: 'name', field: 'name', sortable: true, align: 'left' },
      { name: 'active', label: 'active', field: 'active', sortable: true, align: 'left' },
      { name: 'order', label: 'order', field: 'order', sortable: true, align: 'left' },
      { name: 'actions', label: 'actions', field: 'Ações', align: 'right' }
    ]

    const $q = useQuasar()

    onMounted(async () => {
      await getHouseRules(pagination.value.page)
    })

    const onRequest = async (props) => {
      await getHouseRules(props.pagination.page)
    }

    const getHouseRules = async (page = 0) => {
      try {
        const data = await list(page)
        houseRules.value = data.entities

        pagination.value = {
          page: data.pagination.current_page,
          rowsPerPage: data.pagination.per_page,
          totalPages: data.pagination.total_pages,
          rowsNumber: data.pagination.total
        }
      } catch (error) {
        alert(error)
      } finally {
        loading.value = false
      }
    }

    const editHouseRules = async (id) => {
      router.push({ name: 'formHouseRules', params: { id } })
    }

    const deleteHouseRules = async (id) => {
      try {
        $q.dialog({
          title: 'Delete',
          message: 'Are you sure?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id)
          await getHouseRules(pagination.value.page)
          $q.notify({ message: 'Entity removed successfully.', icon: 'check', color: 'positive' })
        })
      } catch (error) {
        $q.notify({ message: 'Something wrong.', icon: 'times', color: 'negative' })
      }
    }

    return {
      houseRules,
      loading,
      columns,
      deleteHouseRules,
      editHouseRules,
      pagination,
      onRequest,
      pagesNumber: computed(() => Math.ceil(pagination.value.totalPages))
    }
  }
})
</script>
