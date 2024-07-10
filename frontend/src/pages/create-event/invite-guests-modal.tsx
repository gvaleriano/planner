import { AtSign, Plus, X } from "lucide-react"
import type { FormEvent } from "react";
import { Button } from "../../components/button";


interface InviteGuestsModalProps {
  closeGuestsModal: () => void
  contactsToInvite: string[]
  addNewContactToInvite: (event: FormEvent<HTMLFormElement>) => void
  changeContactsToInvite?: (event: FormEvent<HTMLFormElement>) => void
  removeContactsFromInvites: (contact: string) => void
  isUpdate: boolean
}

export function InviteGuestsModal({
  addNewContactToInvite,
  closeGuestsModal,
  contactsToInvite,
  removeContactsFromInvites,
  changeContactsToInvite,
  isUpdate
}: InviteGuestsModalProps) {

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button type="button" onClick={closeGuestsModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados irão receber os convites para confirmar a participação na viagem.
          </p>
        </div>
        <div className="flex flex-wrap gap-1">
          {contactsToInvite.map((email, index) => {
            return (
              <div key={index} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                <span className="text-zinc-300">
                  {email}
                </span>
                {isUpdate && (
                  <button type="button">
                    <X className="size-4 text-zinc-400" onClick={() => removeContactsFromInvites(email)} />
                  </button>
                )}

              </div>
            )
          })}
        </div>

        <div className="w-full h-px bg-zinc-800" />
        {isUpdate ? (
          <form onSubmit={changeContactsToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <div className="px-2 flex items-center flex-1 gap-2">
              <AtSign className="text-zinc-400 size-5" />
              <input
                type="email"
                name="email"
                placeholder="Digite o contato do convidado"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>
            <Button type="submit" variant="primary">
              Convidar
              <Plus className="size-5" />
            </Button>
          </form>
        ) : (
          <form onSubmit={addNewContactToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <div className="px-2 flex items-center flex-1 gap-2">
              <AtSign className="text-zinc-400 size-5" />
              <input
                type="email"
                name="email"
                placeholder="Digite o contato do convidado"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>
            <Button type="submit" variant="primary">
              Convidar
              <Plus className="size-5" />
            </Button>
          </form>
        )}

      </div>
    </div>
  )
}