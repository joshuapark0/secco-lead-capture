import { submitLead } from "./actions";

export default function Home() {
  return (
    <form action={submitLead} className="flex flex-col gap-4 p-10">
      <input name="fullName" placeholder="Full Name" required />
      <input name="email" placeholder="Email" required />
      <input name="company" placeholder="Company" />

      <select name="source" required>
        <option value="">How did you hear about us?</option>
        <option value="Google">Google</option>
        <option value="Referral">Referral</option>
        <option value="Social">Social</option>
        <option value="Other">Other</option>
      </select>

      <textarea name="message" placeholder="Message" />

      <button type="submit">Submit</button>
    </form>
  );
}