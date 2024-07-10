import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { format } from "date-fns";


interface Event {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}
export function DestinationsAndDateHeader() {

  const { eventId } = useParams()
  const [event, setEvent] = useState<Event | undefined>()
  

  useEffect(() => {
    api.get(`/trips/${eventId}`).then(response => setEvent(response.data.trip))
  }, [eventId])

  const displayedDate = event
  ? format(event.starts_at, "d' de 'LLL").concat(' até ').concat(format(event.ends_at, "d' de 'LLL")) 
  : null
  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">
          {event?.destination}
        </span>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">
            {displayedDate}
          </span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />
      {// TODO modal par alterar local e data
      }
        <Button variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  )
}