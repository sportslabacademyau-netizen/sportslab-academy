'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import FormInput from '@/components/FormInput'

const inputClass =
  'h-[64px] w-full rounded-2xl border border-white/25 bg-transparent px-5 text-white outline-none placeholder:text-white/45'

export default function CheckoutPage() {
  const { cart, total } = useCart()

  const hasSingleDayCamp = cart.some((item) => item.id === 'camp-single-day')
  const hasTwoWeeksCamp = cart.some((item) => item.id === 'camp-two-weeks')

  const requiresClinicWeekSelection = cart.some(
    (item) => item.id === 'elite-soccer-clinic-3-day-block'
  )

  const requiresClinicSingleDayNotes = cart.some(
    (item) => item.id === 'elite-soccer-clinic-single-day'
  )

  const hasFullClinic = cart.some(
    (item) => item.id === 'elite-soccer-clinic-full-program'
  )

  // Junior Term 3 packages include a training jersey — collect the size.
  const requiresJerseySize = cart.some(
    (item) =>
      item.id === 'junior-term3-1x' || item.id === 'junior-term3-2x'
  )

  // Junior single-session-per-week packages — collect preferred session day.
  const requiresSessionDay = cart.some(
    (item) =>
      item.id === 'junior-casual' || item.id === 'junior-term3-1x'
  )

  const [form, setForm] = useState({
    parentName: '',
    parentLastName: '',
    email: '',
    phone: '',
    childName: '',
    childDob: '',
    campWeek: '',
    clinicWeek: '',
    jerseySize: '',
    sessionDay: '',
    notes: '',
  })

  const [agreedTerms, setAgreedTerms] = useState(false)
  const [photoConsent, setPhotoConsent] = useState(false)

  const updateForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleCheckout = async (e) => {
    e.preventDefault()

    if (cart.length === 0) {
      alert('Your cart is empty.')
      return
    }

    if (!agreedTerms) {
      alert('Please accept the Terms & Declarations to continue.')
      return
    }

    if (requiresJerseySize && !form.jerseySize) {
      alert('Please select a training jersey size to continue.')
      return
    }

    if (requiresSessionDay && !form.sessionDay) {
      alert('Please select a session day to continue.')
      return
    }

    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cart,
        form: {
          ...form,
          termsAccepted: agreedTerms ? 'Yes' : 'No',
          photoConsent: photoConsent ? 'Yes' : 'No',
        },
      }),
    })

    const data = await res.json()

    if (data.url) {
      window.location.href = data.url
      return
    }

    alert(data.error || 'Something went wrong.')
  }

  return (
    <main className="min-h-screen bg-[#F5F0E6] px-4 py-8 text-white md:px-6 md:py-12">
      <form
        onSubmit={handleCheckout}
        className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_420px]"
      >

        {/* FORM CARD */}
        <section className="mx-auto w-full max-w-[430px] rounded-[2rem] bg-[#0B1220] p-5 shadow-2xl md:max-w-none md:p-10">

          <p className="mb-2 pl-1 text-xs font-black uppercase tracking-[0.28em] text-[#60A5FA]">
            SportsLab Registration
          </p>

          <h1 className="mb-7 text-4xl font-black leading-[0.9] text-white md:text-5xl">
            COMPLETE
            <br />
            REGISTRATION
          </h1>

          <div className="space-y-4">

            <FormInput
              name="parentName"
              required
              placeholder="Parent Name"
              value={form.parentName}
              onChange={updateForm}
              className={inputClass}
            />

            <FormInput
              name="parentLastName"
              required
              placeholder="Parent Last Name"
              value={form.parentLastName}
              onChange={updateForm}
              className={inputClass}
            />

            <FormInput
              name="email"
              type="email"
              required
              placeholder="Email Address"
              value={form.email}
              onChange={updateForm}
              className={inputClass}
            />

            <FormInput
              name="phone"
              type="tel"
              required
              placeholder="Phone Number"
              value={form.phone}
              onChange={updateForm}
              className={inputClass}
            />

            <FormInput
              name="childName"
              required
              placeholder="Child Name"
              value={form.childName}
              onChange={updateForm}
              className={inputClass}
            />

            <div>
              <label
                htmlFor="childDob"
                className="mb-1 block pl-1 text-xs font-bold uppercase tracking-wide text-[#60A5FA]"
              >
                Child Date of Birth
              </label>

              <input
                id="childDob"
                name="childDob"
                type="date"
                required
                value={form.childDob}
                onChange={updateForm}
                className={`${inputClass} [color-scheme:dark]`}
              />
            </div>

            {/* JUNIOR SESSION DAY */}
            {requiresSessionDay && (
              <div className="rounded-2xl border border-[#2563EB]/60 bg-[#2563EB]/15 p-5">
                <p className="text-sm font-black text-white">
                  Session Day
                </p>
                <p className="mb-3 mt-1 text-xs leading-relaxed text-white/60">
                  Please select which weekly session your child will attend.
                </p>

                <select
                  name="sessionDay"
                  required
                  value={form.sessionDay}
                  onChange={updateForm}
                  className="h-[64px] w-full rounded-2xl border border-white/25 bg-[#0B1220] px-5 text-white outline-none"
                >
                  <option value="">Select Session Day</option>
                  <option value="Thursday — 3:30pm to 4:30pm">
                    Thursday — 3:30pm to 4:30pm
                  </option>
                  <option value="Sunday — 9:30am to 10:30am">
                    Sunday — 9:30am to 10:30am
                  </option>
                </select>
              </div>
            )}

            {/* JUNIOR TRAINING JERSEY SIZE */}
            {requiresJerseySize && (
              <div className="rounded-2xl border border-[#2563EB]/60 bg-[#2563EB]/15 p-5">
                <p className="text-sm font-black text-white">
                  Training Jersey Size
                </p>
                <p className="mb-3 mt-1 text-xs leading-relaxed text-white/60">
                  Your package includes a free training jersey. Please select your child&apos;s size.
                </p>

                <select
                  name="jerseySize"
                  required
                  value={form.jerseySize}
                  onChange={updateForm}
                  className="h-[64px] w-full rounded-2xl border border-white/25 bg-[#0B1220] px-5 text-white outline-none"
                >
                  <option value="">Select Jersey Size</option>
                  <option value="Youth 6">Youth 6</option>
                  <option value="Youth 8">Youth 8</option>
                  <option value="Youth 10">Youth 10</option>
                  <option value="Youth 12">Youth 12</option>
                  <option value="Youth 14">Youth 14</option>
                  <option value="Adult S">Adult S</option>
                  <option value="Adult M">Adult M</option>
                  <option value="Adult L">Adult L</option>
                  <option value="Adult XL">Adult XL</option>
                </select>
              </div>
            )}

            {/* ELITE CLINIC 3 DAY BLOCK */}
            {requiresClinicWeekSelection && (
              <select
                name="clinicWeek"
                required
                value={form.clinicWeek}
                onChange={updateForm}
                className="h-[64px] w-full rounded-2xl border border-white/25 bg-[#0B1220] px-5 text-white outline-none"
              >
                <option value="">Select Soccer Clinic Week</option>

                <option value="Week 1 — 1st July to 3rd July">
                  Week 1 — 1st July to 3rd July
                </option>

                <option value="Week 2 — 8th July to 10th July">
                  Week 2 — 8th July to 10th July
                </option>

              </select>
            )}

            {/* CAMP SINGLE DAY */}
            {hasSingleDayCamp && (
              <div className="rounded-2xl border border-white/25 bg-white/5 p-5">

                <p className="text-sm font-bold text-white">
                  Single Day Booking
                </p>

                <p className="mt-1 text-sm leading-relaxed text-white/55">
                  Please write the selected camp day(s) in the notes below.
                </p>

              </div>
            )}

            {/* CLINIC SINGLE DAY */}
            {requiresClinicSingleDayNotes && (
              <div className="rounded-2xl border border-white/25 bg-white/5 p-5">

                <p className="text-sm font-bold text-white">
                  Elite Soccer Clinic Single Day
                </p>

                <p className="mt-1 text-sm leading-relaxed text-white/55">
                  Please write which clinic day(s) your child will attend in the notes below.
                </p>

              </div>
            )}

            {/* FULL CLINIC */}
            {hasFullClinic && (
              <div className="rounded-2xl border border-[#2563EB]/60 bg-[#2563EB]/15 p-5">

                <p className="text-sm font-bold text-white">
                  Full 6-Day Clinic Selected
                </p>

                <p className="mt-1 text-sm leading-relaxed text-white/60">
                  No extra day selection required.
                </p>

              </div>
            )}

            <textarea
              name="notes"
              placeholder={
                hasSingleDayCamp || requiresClinicSingleDayNotes
                  ? 'Confirm selected day(s), notes, allergies or medical information'
                  : 'Notes / Allergies / Medical Information'
              }
              rows={5}
              value={form.notes}
              onChange={updateForm}
              className="w-full rounded-2xl border border-white/25 bg-transparent p-5 text-white outline-none placeholder:text-white/45"
            />

            {/* MANDATORY TERMS & DECLARATIONS */}
            <div className="rounded-2xl border border-white/25 bg-white/5 p-5">

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-white">
                    Terms &amp; Declarations
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#60A5FA]">
                    Required to register
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={agreedTerms}
                  onClick={() => setAgreedTerms((v) => !v)}
                  className={`relative h-7 w-12 flex-none cursor-pointer rounded-full transition ${
                    agreedTerms ? 'bg-[#2563EB]' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
                      agreedTerms ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs leading-relaxed text-white/65">
                <p>
                  <span className="font-bold text-white">Medical Declaration. </span>
                  Please disclose any relevant medical conditions, allergies, medications,
                  injuries or dietary requirements. I confirm that the information provided is
                  accurate and complete.
                </p>
                <p>
                  <span className="font-bold text-white">Risk Acknowledgement. </span>
                  I acknowledge that participation in football training sessions, matches, travel
                  and related activities involves inherent risks including injury, illness,
                  disability and, in rare circumstances, death. I understand and accept these
                  risks.
                </p>
                <p>
                  <span className="font-bold text-white">Insurance Declaration. </span>
                  I understand that SportsLab Academy&apos;s insurance does not replace personal
                  travel, medical or health insurance. I confirm that my child and accompanying
                  family members will hold appropriate travel and medical insurance for the
                  duration of the tour.
                </p>
                <p>
                  <span className="font-bold text-white">Medical Treatment Consent. </span>
                  In the event of illness or injury, I authorise SportsLab Academy staff to seek
                  emergency medical treatment if I cannot be contacted immediately.
                </p>
                <p>
                  <span className="font-bold text-white">Code of Conduct. </span>
                  Players are expected to behave respectfully towards coaches, teammates,
                  opponents, hotel staff, officials and members of the public throughout the
                  tour.
                </p>
                <p>
                  <span className="font-bold text-white">Parent Responsibility. </span>
                  Parents/guardians travelling with their child remain responsible for their
                  child outside scheduled SportsLab Academy activities.
                </p>
                <p>
                  <span className="font-bold text-white">Release &amp; Indemnity. </span>
                  To the maximum extent permitted by law, I release SportsLab Academy and its
                  representatives from liability arising from the ordinary risks associated with
                  participation in football activities and international travel.
                </p>
              </div>
            </div>

            {/* OPTIONAL PHOTO & VIDEO CONSENT */}
            <div className="rounded-2xl border border-white/25 bg-white/5 p-5">

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-white">
                    Photo &amp; Video Consent
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-white/45">
                    Optional
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={photoConsent}
                  onClick={() => setPhotoConsent((v) => !v)}
                  className={`relative h-7 w-12 flex-none cursor-pointer rounded-full transition ${
                    photoConsent ? 'bg-[#2563EB]' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${
                      photoConsent ? 'left-6' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-white/65">
                I authorise SportsLab Academy to use photographs and video footage of my child
                for promotional, marketing, social media, website and educational purposes
                without compensation.
              </p>
            </div>

          </div>
        </section>

        {/* ORDER SUMMARY */}
        <aside className="mx-auto h-fit w-full max-w-[430px] rounded-[2rem] bg-[#0B1220] p-5 text-white shadow-2xl md:max-w-none md:p-6">

          <h2 className="mb-6 text-3xl font-black">
            Order Summary
          </h2>

          <div className="space-y-4">

            {cart.length === 0 && (
              <p className="text-white/50">
                Your cart is empty.
              </p>
            )}

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-white/10 pb-4"
              >

                <div>
                  <p className="font-black">{item.name}</p>

                  <p className="text-sm text-white/50">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-black">
                  ${item.price * item.quantity}
                </p>

              </div>
            ))}

          </div>

          <div className="mt-6 flex justify-between text-3xl font-black">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-full bg-[#2563EB] py-5 text-lg font-black text-white transition active:scale-95"
          >
            Pay & Register →
          </button>

        </aside>

      </form>
    </main>
  )
}