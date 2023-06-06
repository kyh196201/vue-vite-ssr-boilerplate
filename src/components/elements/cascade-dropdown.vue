<template>
  <div class="cascade-dropdowns">
    <my-dropdown
      :model-value="selectedDepths[0]"
      :options="rootCategories"
      always-open
      :is-disabled="false"
      @select="handleRootDepthSelected"
    >
      <template #singleLabel="slotProps">
        <span>
          {{ slotProps.option.name }}
        </span>
      </template>

      <template #option="slotProps">
        <span>
          {{ slotProps.option.name }}
        </span>
      </template>
    </my-dropdown>

    <!-- 2뎁스부터 5뎁스까지 my-dropdown 컴포넌트를 반복하여 생성 -->
    <my-dropdown
      v-for="(depthOptions, index) in depths"
      :key="index"
      :model-value="selectedDepths[index + 1]"
      :options="depthOptions"
      :is-disabled="disabledDepths[index]"
      always-open
      @select="handleDepthSelected(index)($event)"
    >
      <template #singleLabel="slotProps">
        <span>
          {{ slotProps.option.name }}
        </span>
      </template>

      <template #option="slotProps">
        <span>
          {{ slotProps.option.name }}
        </span>
      </template>
    </my-dropdown>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, defineProps, defineEmits } from 'vue';
  import { isEqual } from 'lodash-es';
  import MyDropdown from './my-dropdown.vue';

  export interface Category {
    id: string;
    name: string;
    depths: Category[];
  }

  type Model = [
    Category | null,
    Category | null,
    Category | null,
    Category | null,
    Category | null
  ]

  const props = defineProps<{
    modelValue: Model;
  }>();

  const emit = defineEmits(['update:modelValue']);

  const depths = ref<Category[][]>([[], [], [], []]);

  const disabledDepths = ref<boolean[]>([true, true, true, true]);

  const selectedDepths = ref<Model>([...props.modelValue]);

  // #region rootCategories
  const rootCategories = ref<Category[]>([
    {
      'id': '1',
      'name': 'Electronics',
      'depths': [
        {
          'id': '2',
          'name': 'Mobile Phones',
          'depths': [
            {
              'id': '3',
              'name': 'Smartphones',
              'depths': [
                {
                  'id': '4',
                  'name': 'Apple',
                  'depths': [
                    {
                      'id': '5',
                      'name': 'iPhone',
                      'depths': []
                    },
                    {
                      'id': '6',
                      'name': 'iPad',
                      'depths': []
                    }
                  ]
                },
                {
                  'id': '7',
                  'name': 'Samsung',
                  'depths': [
                    {
                      'id': '8',
                      'name': 'Galaxy',
                      'depths': []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          'id': '9',
          'name': 'Laptops',
          'depths': [
            {
              'id': '10',
              'name': 'Apple',
              'depths': [
                {
                  'id': '11',
                  'name': 'MacBook',
                  'depths': []
                }
              ]
            },
            {
              'id': '12',
              'name': 'Dell',
              'depths': [
                {
                  'id': '13',
                  'name': 'XPS',
                  'depths': []
                }
              ]
            }
          ]
        },
        {
          'id': '14',
          'name': 'TVs',
          'depths': [
            {
              'id': '15',
              'name': 'LG',
              'depths': [
                {
                  'id': '16',
                  'name': 'OLED',
                  'depths': []
                }
              ]
            },
            {
              'id': '17',
              'name': 'Samsung',
              'depths': [
                {
                  'id': '18',
                  'name': 'QLED',
                  'depths': []
                }
              ]
            }
          ]
        }
      ]
    }

  ]);
  // #endregion

  const handleRootDepthSelected = (selectedValue: Category) => {
    // 1뎁스 선택 시 처리 로직
    // API를 이용하여 선택된 카테고리의 정보를 조회하고
    // depths 배열을 업데이트하고 disabledDepths와 selectedDepths를 초기화합니다.
    const childrens = selectedValue.depths ?? [];

    // 1. depths 값을 재설정
    depths.value = [childrens, [], [], []];

    // 2. disabledDepths의 값을 재설정
    disabledDepths.value = [false, true, true, true];

    // 3. selectedDepths의 값을 재설정
    selectedDepths.value = [selectedValue, null, null, null, null];
  };


  const handleDepthSelected = (index: number) => {
    return (selectedValue: Category) => {
      const isLast = index === 3;

      // 마지막 뎁스일 경우
      if (isLast) {
        selectedDepths.value = [...selectedDepths.value.slice(0, 4), selectedValue] as Model;

        return;
      }

      const childrens = selectedValue.depths ?? [];

      // 다음 카테고리 정보가 있을 경우
      if (childrens.length) {
        depths.value = [
          ...depths.value.slice(0, index + 1),
          childrens,
          ...Array(3 - index - 1).fill([]),
        ];

        disabledDepths.value = [
          ...disabledDepths.value.slice(0, index + 1),
          false,
          ...Array(3 - index - 1).fill(true),
        ];
      }
      else {
        // 다음 카테고리 정보가 없을 경우
        depths.value = [
          ...depths.value.slice(0, index + 1),
          ...Array(3 - index).fill([]),
        ];

        disabledDepths.value = [
          ...disabledDepths.value.slice(0, index + 1),
          ...Array(3 - index).fill(true),
        ];
      }

      selectedDepths.value = [
        ...selectedDepths.value.slice(0, index + 1),
        selectedValue,
        ...Array(4 - index - 1).fill(null),
      ] as Model;
    };
  };

  watch(() => props.modelValue, (newValue) => {
    if (isEqual(newValue, selectedDepths.value)) {
      return;
    }

    selectedDepths.value = [...newValue];
  }, { deep: true });

  watch(selectedDepths, (newValue) => {
    emit('update:modelValue', [...newValue]);
  }, { deep: true });
</script>

<style lang="scss" scoped>
	.cascade-dropdowns {
		display: flex;

		:deep() .dropdown {
			flex: 1;
			width: 20%;
		}
	}
</style>
