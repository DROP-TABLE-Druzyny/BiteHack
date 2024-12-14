import {ProfileForm} from "@/app/ui/contact/contact_form";

export default function Page() {

    return (
      <div className="flex flex-col md:flex-col gap-4 md:overflow-hidden">
        <div>
            <h1>Contact Us</h1>
            <ProfileForm/>
        </div>
        
      </div>
    );
  }
  