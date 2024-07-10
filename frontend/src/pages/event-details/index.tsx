import { Plus} from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { ManageGuests } from "./manage-guests";
import { ActivitiesList } from "./activities-list";
import { DestinationsAndDateHeader } from "./destination-and-date-header";
// poderia ser usado flex-1 na div de links importantes (<div className="space-y-1.5">) para não diminuir o icone Link2
export function EventDetailsPage() {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)
  
  function openActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationsAndDateHeader/>

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <button onClick={openActivityModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
              <Plus className="size-5" />
              Cadastrar Atividade
            </button>
          </div>
          <ActivitiesList />
        </div>
        <div className="w-80 space-y-6">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" />
          <ManageGuests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          closeActivityModal={closeActivityModal}
        />
      )}
    </div>
  )
}