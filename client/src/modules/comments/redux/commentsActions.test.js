// test async and thunks for coments actions
import { getComments } from './commentsActions';
import { expect } from 'chai';

xdescribe('The #getComments action', () => {
  const id = 'tt0078748';
  const type = 'Movie';
  const test = getComments(id, type)
  console.log(1, '==>', test);

  
  it('... returns a Promise', () => {
    expect(test).to.be.a('string')
  });
}); 