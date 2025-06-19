import authenticationStore from 'src/store/authentication'
import commonStore from 'src/store/common'
import formFieldOptionsStore from 'src/store/formFieldOptions'
import futureGeneraliProposalStore from 'src/store/future_generali_proposal'
import godigitProposalStore from 'src/store/godigit_proposal'
import hdfcProposalStore from 'src/store/hdfc_proposal'
import quoteDetailsStore from 'src/store/quoteDetails'
import tempFormDataStore from 'src/store/tempFormData'
import urlReferenceStore from 'src/store/urlReference'


const rootReducer = {
  authenticationStore,
  commonStore,
  tempFormDataStore,
  formFieldOptionsStore,
  quoteDetailsStore,
  urlReferenceStore,
  godigitProposalStore,
  futureGeneraliProposalStore,
  hdfcProposalStore
}
export default rootReducer
