import React, { useRef, useState } from "react"
import { ButtonProps, ImageProps, SpinnerProps, Tooltip } from "react-bootstrap"
import CopyToClipboard from "react-copy-to-clipboard"
import styled from "styled-components"
import { Button, Image, Overlay, OverlayTrigger, Spinner } from "./bootstrap"
import { Internal } from "./links"
import { LabeledIcon } from "./shared"

export const TableButton = ({
  onclick,
  children
}: {
  onclick?: () => void
  children: React.ReactElement
}) => {
  return (
    <Button variant="primary" className="m-1" onClick={onclick}>
      {children}
    </Button>
  )
}

export const LoadingButton = ({
  loading,
  children,
  disabled,
  spinnerProps,
  ...restProps
}: ButtonProps & {
  loading?: boolean
  spinnerProps?: Partial<Omit<SpinnerProps, "as" | "role" | "aria-hidden">>
}) => (
  <Button {...restProps} disabled={loading || disabled}>
    {loading ? (
      <>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden
          className="me-2"
          {...spinnerProps}
        />
        <span className="visually-hidden">Loading...</span>
      </>
    ) : null}

    {children}
  </Button>
)

export const ImageButton = styled<
  Pick<ImageProps, "alt" | "src"> & { tooltip?: string; href?: string }
>(({ alt, tooltip, href, ...rest }) => {
  const link = !!href
  const img = <Image alt={alt} tabIndex={0} role="button" {...rest} />
  const content = link ? <Internal href={href}>{img}</Internal> : img
  return tooltip ? (
    <OverlayTrigger
      delay={500}
      placement="top"
      overlay={<Tooltip>{tooltip}</Tooltip>}
    >
      {content}
    </OverlayTrigger>
  ) : (
    content
  )
})`
  cursor: pointer;

  transition: filter 0.15s ease-in-out, outline-width 0.1s ease-in-out;
  &:hover {
    filter: brightness(70%);
  }
  &:active {
    filter: brightness(50%);
  }
  &:focus {
    outline: 3px solid var(--bs-blue-300);
  }
  border-radius: 3px;

  padding: 1px;
`

type FillButtonProps = ButtonProps & {
  label?: string
  Icon?: React.ReactElement
}

export const FillButton = ({
  variant = "primary",
  Icon,
  className,
  label,
  ...rest
}: FillButtonProps) => {
  return (
    <Button
      variant={variant}
      type="submit"
      className={`py-2 col-12 d-flex justify-content-center align-items-center text-decoration-none text-nowrap ${className}`}
      {...rest}
    >
      {Icon && Icon}
      {label}
    </Button>
  )
}

type OutlineButtonProps = ButtonProps & {
  label?: string
  Icon?: React.ReactElement
}

export const OutlineButton = ({
  variant = "outline-secondary",
  Icon,
  className,
  label,
  ...rest
}: OutlineButtonProps) => {
  return (
    <Button
      variant={variant}
      type="submit"
      className={`py-2 col-12 text-capitalize text-nowrap d-flex justify-content-center align-items-baseline btn-hover-secondary ${className}`}
      {...rest}
    >
      {Icon && Icon}
      {label}
    </Button>
  )
}

type HighContrastButton = ButtonProps & {
  state?: boolean
  baseFill?: "solid" | "outline"
  label?: string
  Icon?: React.ReactElement
}

export const HighContrastButton = ({
  state,
  baseFill = "solid",
  variant,
  className,
  Icon,
  label,
  ...rest
}: HighContrastButton) => {
  if (baseFill === "outline") {
    return (
      <Button
        variant={"outline-secondary"}
        className={`btn-hover-secondary ${className}`}
        {...rest}
      >
        {Icon && Icon}
        {label}
      </Button>
    )
  }

  return (
    <Button
      variant={"secondary"}
      className={`btn-hover-outline-secondary ${className}`}
      {...rest}
    >
      {Icon && Icon}
      {label}
    </Button>
  )
}

type ToggleButtonProps = OutlineButtonProps & {
  stateTrueLabel: string
  stateFalseLabel: string
  toggleState: boolean
  onClick: () => void
}

export const ToggleButton = ({
  stateTrueLabel,
  stateFalseLabel,
  toggleState,
  variant,
  ...rest
}: ToggleButtonProps) => {
  return (
    <HighContrastButton
      state={toggleState}
      baseFill={toggleState ? "outline" : "solid"}
      label={toggleState ? stateTrueLabel : stateFalseLabel}
      {...rest}
    />
  )
}

export const TooltipButton = styled<{
  tooltip: string
  text: string
  variant?: string
}>(({ tooltip, text, variant, ...rest }) => {
  return (
    <OverlayTrigger
      delay={500}
      placement="right"
      overlay={<Tooltip>{tooltip}</Tooltip>}
    >
      <Button variant={variant} {...rest}>
        {text}
      </Button>
    </OverlayTrigger>
  )
})`
  font-size: 14px;

  transition: filter 0.15s ease-in-out, outline-width 0.1s ease-in-out;
  &:hover {
    filter: brightness(70%);
  }
  &:active {
    filter: brightness(50%);
  }
  &:focus {
    outline: 3px solid var(--bs-blue-300);
  }
  border-radius: 3px;

  padding: 1px;
`

export const CopyButton = ({
  text,
  tooltipDurationMs = 1000,
  children,
  format = "text/html",
  ...props
}: ButtonProps & {
  text: string
  tooltipDurationMs?: number
  format?: string
}) => {
  const [show, setShow] = useState(false)
  const target = useRef(null)
  const closeTimeout = useRef<any>()
  return (
    <>
      <CopyToClipboard
        text={text}
        options={{ format: format }}
        onCopy={(_, success) => {
          if (success) {
            clearTimeout(closeTimeout.current)
            setShow(true)
            closeTimeout.current = setTimeout(
              () => setShow(false),
              tooltipDurationMs
            )
          }
        }}
      >
        <Button ref={target} variant="secondary" {...props}>
          {children}
        </Button>
      </CopyToClipboard>
      <Overlay target={target} show={show} placement="top">
        {props => <Tooltip {...props}>Copied to Clipboard!</Tooltip>}
      </Overlay>
    </>
  )
}

export const GearIcon = (
  <div className={`py-0`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className={`bi bi-gear-fill px-1 pb-1`}
      viewBox="0 0 16 16"
    >
      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
    </svg>
  </div>
)

export const GearButton = styled(
  ({ children, className, ...props }: ButtonProps) => {
    return (
      <Button
        className={`py-1 fs-5 text-capitalize d-flex align-items-end justify-content-center ${className}`}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className={`bi bi-gear-fill px-1 pb-1`}
          viewBox="0 0 16 16"
        >
          <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
        </svg>
        {children}
      </Button>
    )
  }
)`
  --bs-btn-bg: white; // override bootstrap button background transparency to match Figma
  // TODO: make a generic outline secondary button that takes an icon as a child adn put on that level
`
