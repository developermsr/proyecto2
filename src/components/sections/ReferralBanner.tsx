interface ReferralBannerProps {
  isVisible: boolean
  referrerName: string
}

export default function ReferralBanner({ isVisible, referrerName }: ReferralBannerProps) {
  if (!isVisible) return null

  return (
    <div className="referral-banner">
      <p>
        Disfruta de este descuento especial de S/3 en tu 1era compra gracias a <span className="font-black">{referrerName}</span>
      </p>
    </div>
  )
}