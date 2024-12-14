"use client";

import  { DatePickerForm } from "@/app/ui/calendar/date-picker-form";
import {ProfileForm} from "@/app/ui/contact/contact_form";

export default function Page() {

    return (
      <div className="flex flex-col  gap-4 md:overflow-hidden"> {/* flex-col md:flex-row */}
        <div>
          <DatePickerForm />
        </div>
      </div>
    );
  }
  