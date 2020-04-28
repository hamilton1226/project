import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import SortRequest, { Unsorted } from 'clients/db/SortRequest'
import PageRequest, { UnpagedRequest } from 'clients/db/PageRequest'
import Page from 'clients/Page'
import Patient from '../model/Patient'
import PatientRepository from '../clients/db/PatientRepository'
import { AppThunk } from '../store'

interface PatientsState {
  isLoading: boolean
  patients: Page<Patient>
}

const initialState: PatientsState = {
  isLoading: false,
  patients: {
    content: [],
    hasNext: false,
    hasPrevious: false,
    pageRequest: {
      skip: 0,
      limit: 1,
    },
  },
}

function startLoading(state: PatientsState) {
  state.isLoading = true
}

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    fetchPatientsStart: startLoading,
    fetchPatientsSuccess(state, { payload }: PayloadAction<Page<Patient>>) {
      state.isLoading = false
      state.patients = payload
    },
  },
})
export const { fetchPatientsStart, fetchPatientsSuccess } = patientsSlice.actions

export const fetchPatients = (
  sortRequest: SortRequest,
  pageRequest: PageRequest,
): AppThunk => async (dispatch) => {
  dispatch(fetchPatientsStart())
  const patients = await PatientRepository.findAllPaged(sortRequest, pageRequest)
  dispatch(fetchPatientsSuccess(patients))
}

export const searchPatients = (
  searchString: string,
  sortRequest: SortRequest = Unsorted,
  pageRequest: PageRequest = UnpagedRequest,
): AppThunk => async (dispatch) => {
  dispatch(fetchPatientsStart())

  let patients
  if (searchString.trim() === '') {
    patients = await PatientRepository.findAllPaged(sortRequest, pageRequest)
  } else {
    patients = await PatientRepository.searchPaged(searchString, pageRequest)
  }

  dispatch(fetchPatientsSuccess(patients))
}

export default patientsSlice.reducer
