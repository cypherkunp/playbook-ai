"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  AppointmentDetails,
  AppointmentDetailsProps,
} from "./calendar-appointment";
import { extractAppointment } from "./actions";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] =
    useState<AppointmentDetailsProps | null>(null);
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Extraction</h1>
      <Card>
        <CardContent className="p-4">
          <form
            className="flex"
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              const formData = new FormData(e.target as HTMLFormElement);
              const input = formData.get("appointment") as string;
              const details = await extractAppointment(input);
              setAppointment(details);
              setLoading(false);
            }}
          >
            <Input name="appointment" />
            <Button type="submit" disabled={loading}>
              Submit{loading ? "ting" : ""}
            </Button>
          </form>
        </CardContent>
      </Card>
      {appointment && <AppointmentDetails {...appointment} />}
    </div>
  );
}
