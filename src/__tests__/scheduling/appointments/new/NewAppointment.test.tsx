import { Toaster } from '@hospitalrun/components'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import addMinutes from 'date-fns/addMinutes'
import roundToNearestMinutes from 'date-fns/roundToNearestMinutes'
import { createMemoryHistory } from 'history'
import React from 'react'
import { ReactQueryConfigProvider } from 'react-query'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import createMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as titleUtil from '../../../../page-header/title/TitleContext'
import NewAppointment from '../../../../scheduling/appointments/new/NewAppointment'
import AppointmentRepository from '../../../../shared/db/AppointmentRepository'
import PatientRepository from '../../../../shared/db/PatientRepository'
import Appointment from '../../../../shared/model/Appointment'
import Patient from '../../../../shared/model/Patient'
import { RootState } from '../../../../shared/store'

const { TitleProvider } = titleUtil
const mockStore = createMockStore<RootState, any>([thunk])

describe('New Appointment', () => {
  const testPatient: Patient = {
    addresses: [],
    bloodType: 'o',
    careGoals: [],
    carePlans: [],
    code: 'P-qrQc3FkCO',
    createdAt: new Date().toISOString(),
    dateOfBirth: new Date(0).toISOString(),
    emails: [],
    id: '123',
    index: '',
    isApproximateDateOfBirth: false,
    phoneNumbers: [],
    rev: '',
    sex: 'female',
    updatedAt: new Date().toISOString(),
    visits: [],
    givenName: 'Popo',
    prefix: 'Mr',
    fullName: 'Mr Popo',
  }

  const noRetryConfig = {
    queries: {
      retry: false,
    },
  }

  const setup = () => {
    const expectedAppointment = { id: '123' } as Appointment

    jest.spyOn(titleUtil, 'useUpdateTitle').mockImplementation(() => jest.fn())
    jest.spyOn(AppointmentRepository, 'save').mockResolvedValue(expectedAppointment)
    jest.spyOn(PatientRepository, 'search').mockResolvedValue([testPatient])

    const history = createMemoryHistory({ initialEntries: ['/appointments/new'] })

    const Wrapper: React.FC = ({ children }: any) => (
      <ReactQueryConfigProvider config={noRetryConfig}>
        <Provider store={mockStore({} as any)}>
          <Router history={history}>
            <TitleProvider>{children}</TitleProvider>
          </Router>
          <Toaster draggable hideProgressBar />
        </Provider>
      </ReactQueryConfigProvider>
    )

    return {
      expectedAppointment,
      history,
      ...render(<NewAppointment />, { wrapper: Wrapper }),
    }
  }

  describe('header', () => {
    it('should have called useUpdateTitle hook', async () => {
      setup()

      await waitFor(() => {
        expect(titleUtil.useUpdateTitle).toHaveBeenCalled()
      })
    })
  })

  describe('layout', () => {
    it('should render an Appointment Detail Component', async () => {
      const { container } = setup()

      await waitFor(() => {
        expect(container.querySelector('form')).toBeInTheDocument()
      })
    })
  })

  describe('on save click', () => {
    it('should have error when error saving without patient', async () => {
      setup()

      const expectedError = {
        message: 'scheduling.appointment.errors.createAppointmentError',
        patient: 'scheduling.appointment.errors.patientRequired',
      }

      const expectedAppointment = {
        patient: '',
        startDateTime: roundToNearestMinutes(new Date(), { nearestTo: 15 }).toISOString(),
        endDateTime: addMinutes(
          roundToNearestMinutes(new Date(), { nearestTo: 15 }),
          60,
        ).toISOString(),
        location: 'location',
        reason: 'reason',
        type: 'routine',
      } as Appointment

      userEvent.type(
        screen.getByPlaceholderText(/scheduling\.appointment\.patient/i),
        expectedAppointment.patient,
      )

      userEvent.click(screen.getByText(/scheduling.appointments.createAppointment/i))

      expect(screen.getByText(expectedError.message)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/scheduling\.appointment\.patient/i)).toHaveClass(
        'is-invalid',
      )
      expect(AppointmentRepository.save).not.toHaveBeenCalled()
    })

    it('should have error when error saving with end time earlier than start time', async () => {
      const { container } = setup()

      const expectedError = {
        message: 'scheduling.appointment.errors.createAppointmentError',
        startDateTime: 'scheduling.appointment.errors.startDateMustBeBeforeEndDate',
      }

      const expectedAppointment = {
        patient: testPatient.fullName,
        startDateTime: new Date(2020, 10, 10, 0, 0, 0, 0).toISOString(),
        endDateTime: new Date(1957, 10, 10, 0, 0, 0, 0).toISOString(),
        location: 'location',
        reason: 'reason',
        type: 'routine',
      } as Appointment

      userEvent.type(
        screen.getByPlaceholderText(/scheduling\.appointment\.patient/i),
        expectedAppointment.patient,
      )
      fireEvent.change(container.querySelectorAll('.react-datepicker__input-container input')[0], {
        target: { value: expectedAppointment.startDateTime },
      })
      fireEvent.change(container.querySelectorAll('.react-datepicker__input-container input')[1], {
        target: { value: expectedAppointment.endDateTime },
      })
      userEvent.click(screen.getByText(/scheduling.appointments.createAppointment/i))

      expect(screen.getByText(expectedError.message)).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/scheduling\.appointment\.patient/i)).toHaveClass(
        'is-invalid',
      )
      expect(container.querySelectorAll('.react-datepicker__input-container input')[0]).toHaveClass(
        'is-invalid',
      )
      expect(screen.getByText(expectedError.startDateTime)).toBeInTheDocument()
      expect(AppointmentRepository.save).toHaveBeenCalledTimes(0)
    })

    it('should call AppointmentRepo.save when save button is clicked', async () => {
      const { container } = setup()

      const expectedAppointment = {
        patient: testPatient.fullName,
        startDateTime: roundToNearestMinutes(new Date(), { nearestTo: 15 }).toISOString(),
        endDateTime: addMinutes(
          roundToNearestMinutes(new Date(), { nearestTo: 15 }),
          60,
        ).toISOString(),
        location: 'location',
        reason: 'reason',
        type: 'routine',
      } as Appointment

      userEvent.type(
        screen.getByPlaceholderText(/scheduling\.appointment\.patient/i),
        expectedAppointment.patient,
      )
      userEvent.click(await screen.findByText(`${testPatient.fullName} (${testPatient.code})`))

      fireEvent.change(container.querySelectorAll('.react-datepicker__input-container input')[0], {
        target: { value: expectedAppointment.startDateTime },
      })

      fireEvent.change(container.querySelectorAll('.react-datepicker__input-container input')[1], {
        target: { value: expectedAppointment.endDateTime },
      })

      userEvent.type(
        screen.getByRole('textbox', { name: /scheduling\.appointment\.location/i }),
        expectedAppointment.location,
      )

      userEvent.type(
        screen.getByPlaceholderText('-- Choose --'),
        `${expectedAppointment.type}{arrowdown}{enter}`,
      )

      const reasonInput = screen.queryAllByRole('textbox', { hidden: false })[3]
      userEvent.type(reasonInput, expectedAppointment.reason)

      userEvent.click(
        screen.getByRole('button', {
          name: /scheduling.appointments.createAppointment/i,
        }),
      )

      await waitFor(() => {
        expect(AppointmentRepository.save).toHaveBeenCalledWith({
          ...expectedAppointment,
          patient: testPatient.id,
        })
      })
    }, 30000)

    it('should navigate to /appointments/:id when a new appointment is created', async () => {
      const { history, expectedAppointment } = setup()

      userEvent.type(
        screen.getByPlaceholderText(/scheduling\.appointment\.patient/i),
        `${testPatient.fullName}`,
      )
      userEvent.click(await screen.findByText(`${testPatient.fullName} (${testPatient.code})`))

      userEvent.click(screen.getByText(/scheduling.appointments.createAppointment/i))

      await waitFor(() => {
        expect(history.location.pathname).toEqual(`/appointments/${expectedAppointment.id}`)
      })
      await waitFor(() => {
        expect(screen.getByText(`scheduling.appointment.successfullyCreated`)).toBeInTheDocument()
      })
    })
  })

  describe('on cancel click', () => {
    it('should navigate back to /appointments', async () => {
      const { history } = setup()

      userEvent.click(screen.getByText(/actions\.cancel/i))

      expect(history.location.pathname).toEqual('/appointments')
    })
  })
})
