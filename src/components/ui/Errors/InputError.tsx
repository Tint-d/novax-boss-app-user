import { t } from 'i18next'

interface InputErrorProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any
}
const InputError = ({errors} : InputErrorProps) => {

  let message : string = "" ;
  if(errors?.message){
    message = errors.message
  }
  else if(errors?.file?.message){
    message = errors.file.message
  }
  else{
    message = ""
  }

  return (
    <div className="invalid-feedback text-red-600">{t(message)}</div>
  )
}

export default InputError