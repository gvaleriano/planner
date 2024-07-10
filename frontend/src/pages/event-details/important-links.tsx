import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { CreateLinkModal } from "./create-link-modal";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface LinkProp {
  id: string
  title: string
  url: string
}

export function ImportantLinks() {
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
  const { eventId } = useParams()

  const [links, setLinks] = useState<LinkProp[]>([])


  useEffect(() => {
    api.get(`/trips/${eventId}/links`)
      .then(response => setLinks(response.data.links))
  }, [eventId])

  function openLinkModal() {
    setIsCreateLinkModalOpen(true)
  }

  function closeLinkModal() {
    setIsCreateLinkModalOpen(false)
  }
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links Importantes</h2>
      <div className="space-y-5">
        {links.map(data => {
          return (
            <div key={data.id} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">{data.title}</span>
                <a href={data.url} target="_blank" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                  {data.url}
                </a>
              </div>
              <Link2 className="text-zinc-400 size-5 shrink-0" />
            </div>
          )
        })}
      </div>
      <Button onClick={openLinkModal} variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {isCreateLinkModalOpen && (
        <CreateLinkModal closeLinkModal={closeLinkModal} />
      )}
    </div>


  )
}