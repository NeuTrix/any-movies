require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test 'has sub_comm method' do
    @comm = Comment.new
    assert @comm.sub_comments = 9
  end
end
