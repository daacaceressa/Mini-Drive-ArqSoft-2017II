require 'test_helper'

class HashdocumentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @hashdocument = hashdocuments(:one)
  end

  test "should get index" do
    get hashdocuments_url, as: :json
    assert_response :success
  end

  test "should create hashdocument" do
    assert_difference('Hashdocument.count') do
      post hashdocuments_url, params: { hashdocument: { path: @hashdocument.path } }, as: :json
    end

    assert_response 201
  end

  test "should show hashdocument" do
    get hashdocument_url(@hashdocument), as: :json
    assert_response :success
  end

  test "should update hashdocument" do
    patch hashdocument_url(@hashdocument), params: { hashdocument: { path: @hashdocument.path } }, as: :json
    assert_response 200
  end

  test "should destroy hashdocument" do
    assert_difference('Hashdocument.count', -1) do
      delete hashdocument_url(@hashdocument), as: :json
    end

    assert_response 204
  end
end
