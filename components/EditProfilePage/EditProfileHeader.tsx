import { useTranslation } from "next-i18next"
import { Role } from "../auth"
import { Button, Col, Row, Stack } from "../bootstrap"
import {
  FillButton,
  GearIcon,
  OutlineButton
} from "../buttons"

export const EditProfileHeader = ({
  formUpdated,
  onSettingsModalOpen,
  uid,
  role
}: {
  formUpdated: boolean
  onSettingsModalOpen: () => void
  uid: string
  role: Role
}) => {
  const { t } = useTranslation("editProfile")

  return (
    <Row className={`my-5`}>
      <Col className={`align-self-end`}>
        <h1 className={`display-3`}>{t("header")}</h1>
      </Col>
      <Col xs={12} md={2} className={`d-grid gap-2`}>
        <OutlineButton
          label={t("settings")}
          Icon={GearIcon}
          onClick={() => onSettingsModalOpen()}
        />
        <FillButton
          href={`/profile?id=${uid}`}
          label={
            role !== "organization" ? t("viewMyProfile") : t("viewOrgProfile")
          }
        ></FillButton>
      </Col>
    </Row>
  )
}
