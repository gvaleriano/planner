import type { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { ALargeSmall, Link2, X } from "lucide-react";
import { Button } from "../../components/button";


interface CreateLinkModalProps {
  closeLinkModal: () => void
}

export function CreateLinkModal({
  closeLinkModal
}: CreateLinkModalProps) {
  const { eventId } = useParams()

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    //Quando temos apenas inputs nativos do HTML podemos utilizar desta forma a captação dos valores

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString();
    const url = data.get('url')?.toString();

    await api.post(`/trips/${eventId}/links`, {
      title,
      url
    })

    window.document.location.reload() // Não é a melhor forma de fazer
  }
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar Link</h2>
            <button type="button" onClick={closeLinkModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar as atividades.
          </p>
        </div>
        <form onSubmit={createLink} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <ALargeSmall className="text-zinc-400 size-5" />
            <input
              type="text"
              name="title"
              placeholder="Titulo"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Link2 className="text-zinc-400 size-5" />
              <input
                type="text"
                name="url"
                placeholder="URL"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />
            </div>
          </div>
          <Button variant="primary" size="full">
            Confirmar criação do link
          </Button>
        </form>
      </div>
    </div>
  )
}