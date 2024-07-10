import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmEventModal } from './confirm-event-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/invite-guests-steps';
import type { DateRange } from 'react-day-picker';
import { api } from '../../lib/axios';

export function CreateEventPage() {

  const navigate = useNavigate()

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmEventModalOpen, setIsConfirmEventModalOpen] = useState(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

  const [contactsToInvite, setContactsToInvite] = useState(['guilherme.hvaleriano@gmail.com'])

  function openGuestsInputs() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInputs() {
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function openConfirmEventModal() {
    setIsConfirmEventModalOpen(true)
  }

  function closeConfirmEventModal() {
    setIsConfirmEventModalOpen(false)
  }

  function addNewContactToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString();

    if (!email) {
      return
    }

    if (contactsToInvite.includes(email)) {
      return
    }

    setContactsToInvite([...contactsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeContactsFromInvites(contactToRemove: string) {
    const newContactList = contactsToInvite.filter(contact => contact !== contactToRemove)
    setContactsToInvite(newContactList)
  }

  async function createEvent(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    if(!destination){
      return
    }

    if(!eventStartAndEndDates?.from || !eventStartAndEndDates?.to){
      return
    }

    if(contactsToInvite.length === 0){
      return
    }

    if(!ownerEmail || !ownerName){
      return
    }

   const response =  await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates?.from,
      ends_at: eventStartAndEndDates?.to,
      emails_to_invite: contactsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    })

    const {tripId} = response.data
    navigate(`/event/${tripId}`)
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem ou encontro!</p>
        </div>
        <div className="space-y-4">
          <DestinationAndDateStep 
            closeGuestsInputs={closeGuestsInputs}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInputs={openGuestsInputs}
            setDestination={setDestination}
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />

          {isGuestsInputOpen && (
              <InviteGuestsStep 
                contactsToInvite={contactsToInvite}
                openConfirmEventModal={openConfirmEventModal}
                openGuestsModal={openGuestsModal}
              />
          )}
        </div>
        <p className="zinc-500 text-sm">
          Ao planejar seus encontros ou viagens pela plann.er você automaticamente concorda <br />
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a>.
        </p>
      </div>
      {isGuestsModalOpen && (
        <InviteGuestsModal 
          contactsToInvite={contactsToInvite}
          addNewContactToInvite={addNewContactToInvite}
          closeGuestsModal={closeGuestsModal}
          removeContactsFromInvites={removeContactsFromInvites}
          isUpdate={false}
        />
      )}
      {isConfirmEventModalOpen && (
        <ConfirmEventModal 
          closeConfirmTripModal={closeConfirmEventModal}
          createEvent={createEvent}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}

    </div>
  )
}
