import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState, type FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { InviteGuestsModal } from "../create-event/invite-guests-modal";

interface Participant {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export function ManageGuests() {
  const { eventId } = useParams()
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)

  const [participantsEmail, setParticipantsEmail] = useState([''])

  function openGuestsModal() {
    const participantList = participants.map(p => {
      return (
        p.email
      )
    })

    setParticipantsEmail([...participantList])

    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function addNewContactToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString();

    if (!email) {
      return
    }
    const participantList = participants.map(p => {
      return (
        p.email
      )
    })

    if (participantList.includes(email)) {
      return
    }
    console.log(participantList)
    setParticipantsEmail([...participantList, email])

    event.currentTarget.reset();
  }

  function removeContactsFromInvites(contactToRemove: string) {
    const newContactList = participantsEmail.filter(contact => contact !== contactToRemove)
    setParticipantsEmail(newContactList)
  }

  //Melhorar essa função de como organizar os convidados.
  async function changeContactsToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString();

    if (!email) {
      return
    }

    if (participantsEmail.includes(email)) {
      return
    }

    await api.post(`/trips/${eventId}/invites`, {
      email
    })
   
    window.document.location.reload() // Não é a melhor forma de fazer
  }

  useEffect(() => {
    api.get(`/trips/${eventId}/participants`).then(response => setParticipants(response.data.participants))
  }, [eventId])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participants.map((participant, index) => {
          return (
            <div key={participant.id} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
                <span className="block text-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>
              {participant.is_confirmed ? (
                <CheckCircle2 className="size-5 shrink-0 text-green-400" />
              ) : (
                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
              )}
            </div>
          )
        })}
      </div>
      <Button onClick={openGuestsModal} variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          contactsToInvite={participantsEmail}
          addNewContactToInvite={addNewContactToInvite}
          closeGuestsModal={closeGuestsModal}
          removeContactsFromInvites={removeContactsFromInvites}
          changeContactsToInvite={changeContactsToInvite}
          isUpdate={true}
        />
      )}
    </div>
  )
}